# USFWS Leaflet Template  

This template serves as a starting point for USFWS web mapping projects and was designed to follow the [draft Mimimum Map Elements](https://www.fws.gov/stand/standards/pr_mapelements_WWW.html).  The template uses [Leaflet](http://leafletjs.com) as the JavaScript web mapping library.

## Getting Started

Check out some great free resources for learning [git](http://git-scm.com/book/en/v1/Getting-Started) and [GitHub](https://try.github.io/levels/1/challenges/1) if you're new to this!

To begin you'll want to [fork](https://github.com/USFWS/leaflet-template/fork) (copy) the contents of this repository either to your User Account, or under the USFWS Account.  Once you have your own copy you can begin to modify the template to fit your project's needs.  Once you get started there are a few key considerations to keep in mind:

### Making Changes

Generally speaking the pertinent pieces of the template that should be changed for your project are identified with comments in the code.  This is true of both `index.html`, which lays out the elements you see on the page as well as the JavaScript, which controls the page's interactivity.

#### Example HTML comment
```html
<!-- Page title appears in the browser's tab -->
<title>Put your Project Title here!</title>
```

#### Example JavaScript comment
```javascript
// Get raw data (CSV, WKT, KML, GPX, etc) onto a map with leaflet-omnivore  https://github.com/mapbox/leaflet-omnivore
var offices = omnivore.csv('data/offices.csv');
```

### Data

There are many options for getting data onto a web map, but perhaps the easiest is to use a [flat data file](https://docs.google.com/a/fws.gov/document/d/1ZiFT6qsN5656wkVtq9pDaRuLvXLgZuOdNWEvtdVcIjw/edit#heading=h.9fbdzmpfc004) (sorry, DOI only), which does not require you to serve your data from a GIS server.  Instead, you can just drop your data into the `/data` directory and reference it directly in your JavaScript.  This example template does just this with a Comma Separated Value table of USFWS field offices.  To accomplish this we're making use of [omnivore](https://github.com/mapbox/leaflet-omnivore) ([license](https://github.com/mapbox/leaflet-omnivore/blob/master/LICENSE)), a plugin for Leaflet that consumes flat files and creates a map layer for you. Setting up your own data sources with a GIS server is beyond the scope of this introduction.

### Performance

To simplify this template individual JavaScript and CSS files are included by default.  Typically the more files you include in your final product the slower your application will load.  It is a best practice to [minify](http://en.wikipedia.org/wiki/Minification_&#40;programming&#41;) your scripts, and concatenate them into a single file (one for JavaScript, one for CSS).  This reduces the number of files the user needs to download in order to run your application, which can be a major bottleneck.  The files included in this template are the non-minified version that are very helpful for development.  This way, if you make a mistake in your JavaScript you should be able to track down the bug rather than getting a very cryptic error message.

## Reporting Problems

Please report any problems you may encounter using GitHub's built-in tools for [reporting issues](https://github.com/USFWS/leaflet-template/issues/new).  

## To Do

 - Remove as many dependencies as possible
 - Document the scripts that are removed so folks can easily find them if needed
 - Concatenate/Minify CSS Frameworks as they're unlikely to ever be edited

## License

This project is in the [public domain](https://github.com/USFWS/leaflet-template/blob/master/LICENSE.md).  Other software products used in this project make use of their own licenses.

## Discliamer

The United States Fish and Wildlife Service (FWS) GitHub project code is provided on an "as is" basis and the user assumes responsibility for its use.  FWS has relinquished control of the information and no longer has responsibility to protect the integrity , confidentiality, or availability of the information.  Any reference to specific commercial products, processes, or services by service mark, trademark, manufacturer, or otherwise, does not constitute or imply their endorsement, recommendation or favoring by FWS.  The FWS seal and logo shall not be used in any manner to imply endorsement of any commercial product or activity by FWS or the United States Government.