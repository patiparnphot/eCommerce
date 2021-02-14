import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

import {
  fetchContactuscontent,
  fetchContactuscontentSuccess,
  fetchContactuscontentFailure
} from '../actions/contents';

function ContactUsPage ({google, contactUsContent, fetchContactuscontent}) {

  React.useEffect(() => {
    fetchContactuscontent();
    window.scrollTo(0, 0);
    // function initMap() {
    //   // Latitude and Longitude
    //   var myLatLng = {lat: -6.207690, lng: 106.985270};
  
    //   var map = new google.maps.Map(document.getElementById('myMap'), {
    //       zoom: 17,
    //       center: myLatLng
    //   });
  
    //   var marker = new google.maps.Marker({
    //       position: myLatLng,
    //       map: map,
    //       title: 'South Jakarta, INA' // Title Location
    //   });
    // }
  }, []);

  const { content } = contactUsContent;
  
  if(!content) {
    return <div/>
  } else {
    return (
      <div class="page-section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="my-3 wow fadeInUp">
              <div class="card-page">
                <div class="row row-beam-md">
                  <div class="text-center py-3 py-md-2">
                    <i class="icon icofont icofont-location-pin h3"></i>
                    <p class="fg-primary fw-medium fs-vlarge">{content.locationHead}</p>
                    {content.locations.map((location) => {
                      return (
                        <p class="mb-0">{location}</p>
                      );
                    })}
                  </div>
                  <div class="text-center py-3 py-md-2">
                    <i class="icon icofont icofont-phone-circle h3"></i>
                    <p class="fg-primary fw-medium fs-vlarge">{content.telephoneHead}</p>
                    {content.telephones.map((telephone) => {
                      return (
                        <p class="mb-0">{telephone}</p>
                      );
                    })}
                  </div>
                  <div class="text-center py-3 py-md-2">
                    <i class="icon icofont icofont-email h3"></i>
                    <p class="fg-primary fw-medium fs-vlarge">{content.emailHead}</p>
                    {content.emails.map((email) => {
                      return (
                        <p class="mb-0">{email}</p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div class="my-3 wow fadeInUp">
              <div class="card-page">
                <div class="maps-container">
                  <Map
                    google={google}
                    zoom={16}
                    style={{width: "96%", height: "93%", inset: "inherit"}}
                    initialCenter={{lat: parseFloat(content.latitude), lng: parseFloat(content.longitude)}}
                  >

                  </Map>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}

const ContactUsWrapper = GoogleApiWrapper({
  apiKey: 'AIzaSyCYBp3QCQpIi_-SiJLV5jk_u8olLt4Y2Kc'
})(ContactUsPage);

const mapDispatchToProps = (dispatch) => {
  return {
    fetchContactuscontent: () => {
      dispatch(fetchContactuscontent()).then((response) => {
        console.log('contactusContent: ', response.payload);
        !response.error ? dispatch(fetchContactuscontentSuccess(response.payload)) : dispatch(fetchContactuscontentFailure(response.payload));
      });
    }
  };
};


function mapStateToProps(state) {
  return {
    contactUsContent: state.contents.contactUs
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactUsWrapper);
