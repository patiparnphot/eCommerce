
module.exports = function template(title = "MEATSEO", initialState = {}, content = "", description = "We are the best") {
  let scripts = ''; // Dynamically ship scripts based on render type
  if (content) {
    scripts = ` <script>
                   window.__STATE__ = ${JSON.stringify(initialState)}
                </script>
                <script src="/js/appClient.js"></script>
                `
  } else {
    scripts = ` <script src="/js/appBundle.js"> </script> `
  }
  //let titleComponent = helmet.title.toComponent();
  //let title = titleComponent[0] && titleComponent[0].props ? (titleComponent[0].props.children || '') : '';
  let page = `<!DOCTYPE html>
              <html>
                 <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>${title}</title>
                    <meta name="description" content="${description}">
    
                    <!--Favicons -->
                    <link href="/img/favicon.png" rel="icon">
                    <link href="/img/apple-touch-icon.png" rel="apple-touch-icon">
    
                    <!--Google Fonts -->
                    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,500,600,700,700i|Montserrat:300,400,500,600,700" rel="stylesheet">
    
                    <!--Bootstrap CSS File -->
                    <link href="/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    
                    <!--Libraries CSS Files -->
                    <link href="/lib/font-awesome/css/font-awesome.min.css" rel="stylesheet">
                    <link href="/lib/animate/animate.min.css" rel="stylesheet">
                    <link href="/lib/ionicons/css/ionicons.min.css" rel="stylesheet">
                    <link href="/lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">
                    <link href="/lib/lightbox/css/lightbox.min.css" rel="stylesheet">
    
                    <!--Main Stylesheet File -->
                    <link href="/css/style.css" rel="stylesheet">
    
                    <!-- Global site tag (gtag.js) - Google Analytics -->
                    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-155291561-5"></script>
                    <script>
                       window.dataLayer = window.dataLayer || [];
                       function gtag(){dataLayer.push(arguments);}
                       gtag('js', new Date());
                       gtag('config', 'UA-155291561-5');
                    </script>

                 </head>
                 <body>
                    <script>

                       window.fbAsyncInit = function() {
                          window.FB.init({
                             appId            : '182388739813749',
                             autoLogAppEvents : true,
                             xfbml            : true,
                             version          : 'v5.0'
                          })
                       };
    
                       // Load the SDK asynchronously
                       (function(d, s, id) {
                          var js, fjs = d.getElementsByTagName(s)[0];
                          if (d.getElementById(id)) return;
                          js = d.createElement(s); js.id = id;
                          js.src = "//connect.facebook.net/en_US/sdk.js";
                          fjs.parentNode.insertBefore(js, fjs);
                       }(document, 'script', 'facebook-jssdk'));

                    </script> 

                    <div id="root" class="wrap-inner">${content}</div>
  
                    <!-- JavaScript Libraries -->
                    <script src="/lib/jquery/jquery.min.js"></script>
                    <script src="/lib/jquery/jquery-migrate.min.js"></script>
                    <script src="/lib/bootstrap/js/bootstrap.bundle.min.js"></script>
                    <script src="/lib/wow/wow.min.js"></script>
                    <script src="/lib/isotope/isotope.pkgd.min.js"></script>
                    <script src="/lib/lightbox/js/lightbox.min.js"></script>
                    <script src="/lib/owlcarousel/owl.carousel.min.js"></script>

                    <!-- Template Main Javascript File -->
                    <script src="/js/main.js"></script>
    
                    ${scripts}

                 </body>
              </html>
              `;

  return page;
}
