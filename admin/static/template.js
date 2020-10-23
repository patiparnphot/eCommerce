
module.exports = function template(title = "ADMINISTRATOR", initialState = {}, content = "", description = "Content Management System for Your Website") {
  let scripts = ''; // Dynamically ship scripts based on render type
  if (content) {
    scripts = ` <script>
                   window.__STATE__ = ${JSON.stringify(initialState)}
                </script>
                <script src="/admin/js/appClient.js"></script>
                `
  } else {
    scripts = ` <script src="/admin/js/appBundle.js"> </script> `
  }
  //let titleComponent = helmet.title.toComponent();
  //let title = titleComponent[0] && titleComponent[0].props ? (titleComponent[0].props.children || '') : '';
  let page = `<!DOCTYPE html>
              <html lang="en">
                 <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>${title}</title>
                    <meta name="description" content="${description}">
    
                    <!--Favicons -->
                    <link href="/admin/img/favicon.png" rel="icon">
                    <link href="/admin/img/apple-icon.png" rel="apple-touch-icon">
    
                    <!--Google Fonts -->
                    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet">
    
                    <!--Bootstrap CSS File -->
                    <link href="/admin/css/bootstrap.min.css" rel="stylesheet">
    
                    <!--Libraries CSS Files -->
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
                    <link href="/admin/css/ionicons.min.css" rel="stylesheet">
                    <link href="/admin/css/lightbox.min.css" rel="stylesheet">

                    <script src="/admin/js/core/jquery.min.js"></script>
                    <script src="/admin/js/core/bootstrap.min.js"></script>
                    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">
                    <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>
                    
                    <!-- CSS Files -->
                    <link href="/admin/css/now-ui-dashboard.css?v=1.5.0" rel="stylesheet" />

                    <!-- CSS Just for demo purpose, don't include it in your project -->
                    <link href="/admin/demo/demo.css" rel="stylesheet" />

                 </head>
                 <body> 


                    <div id="root" class="wrap-inner">${content}</div>
  

                    <!--   Core JS Files   -->
                    <script src="/admin/js/core/popper.min.js"></script>
                    <script src="/admin/js/plugins/perfect-scrollbar.jquery.min.js"></script>
                    <!--  Google Maps Plugin    -->
                    <!-- <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script> -->
                    <!-- Chart JS -->
                    <script src="/admin/js/plugins/chartjs.min.js"></script>
                    <!-- Isotope JS -->
                    <script src="/admin/js/plugins/isotope.pkgd.min.js"></script>
                    <!-- Lightbox JS -->
                    <script src="/admin/js/plugins/lightbox.min.js"></script>
                    <!--  Notifications Plugin    -->
                    <script src="/admin/js/plugins/bootstrap-notify.js"></script>
                    <!-- Control Center for Now Ui Dashboard: parallax effects, scripts for the example pages etc -->
                    <script src="/admin/js/now-ui-dashboard.min.js?v=1.5.0" type="text/javascript"></script>
                    <!-- Now Ui Dashboard DEMO methods, don't include it in your project! -->
                    <script src="/admin/demo/demo.js"></script>
   
                    ${scripts}

                 </body>
              </html>
              `;

  return page;
}
