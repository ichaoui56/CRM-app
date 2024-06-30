<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="CodeHim">
    <title> Invoice Template Example </title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
    <link rel='stylesheet' href='//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'>
    <style>
        .cd__main {
            background: linear-gradient(to right, #9796f0, #fbc7d4) !important;
        }

        body {
            background: #EEE;
            /* font-size:0.9em !important; */
        }

        .invoice {
            background: #fff;
            width: 970px !important;
            margin: 50px auto;
        }

        .invoice .invoice-header {
            padding: 25px 25px 15px;
        }

        .invoice .invoice-header h1 {
            margin: 0;
        }

        .invoice .invoice-header .media .media-body {
            font-size: 0.9em;
            margin: 0;
        }

        .invoice .invoice-body {
            border-radius: 10px;
            padding: 25px;
            background: #FFF;
        }

        .invoice .invoice-footer {
            padding: 15px;
            font-size: 0.9em;
            text-align: center;
            color: #999;
        }

        .logo {
            max-height: 70px;
            border-radius: 10px;
        }

        .dl-horizontal {
            margin: 0;
        }

        .dl-horizontal dt {
            float: left;
            width: 80px;
            overflow: hidden;
            clear: left;
            text-align: right;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .dl-horizontal dd {
            margin-left: 90px;
        }

        .rowamount {
            padding-top: 15px !important;
        }

        .rowtotal {
            font-size: 1.3em;
        }

        .colfix {
            width: 12%;
        }

        .mono {
            font-family: monospace;
        }

        * {
            margin: 0;
            padding: 0;
        }

        *,
        *::before,
        *::after {
            margin: 0;
            padding: 0;
            box-sizing: inherit;
        }

        body {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            align-content: flex-start;

            font-family: 'Roboto', sans-serif;
            font-style: normal;
            font-weight: 300;
            font-smoothing: antialiased;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            font-size: 15px;
            background: #eee;
        }

        .cd__intro {
            padding: 60px 30px;
            margin-bottom: 15px;
            flex-direction: column;

        }

        .cd__intro,
        .cd__credit {
            display: flex;
            width: 100%;
            justify-content: center;
            align-items: center;
            background: #fff;
            color: #333;
            line-height: 1.5;
            text-align: center;
        }

        .cd__intro h1 {
            font-size: 18pt;
            padding-bottom: 15px;

        }

        .cd__intro p {
            font-size: 14px;
        }

        .cd__action {
            text-align: center;
            display: block;
            margin-top: 20px;
        }

        .cd__action a.cd__btn {
            text-decoration: none;
            color: #666;
            border: 2px solid #666;
            padding: 10px 15px;
            display: inline-block;
            margin-left: 5px;
        }

        .cd__action a.cd__btn:hover {
            background: #666;
            color: #fff;
            transition: .3s;
            -webkit-transition: .3s;
        }

        .cd__action .cd__btn:before {
            font-family: FontAwesome;
            font-weight: normal;
            margin-right: 10px;
        }

        .down:before {
            content: "\f019"
        }

        .back:before {
            content: "\f112"
        }

        .cd__credit {
            padding: 12px;
            font-size: 9pt;
            margin-top: 40px;

        }

        .cd__credit span:before {
            font-family: FontAwesome;
            color: #e41b17;
            content: "\f004";


        }

        .cd__credit a {
            color: #333;
            text-decoration: none;
        }

        .cd__credit a:hover {
            color: #1DBF73;
        }

        .cd__credit a:hover:after {
            font-family: FontAwesome;
            content: "\f08e";
            font-size: 9pt;
            position: absolute;
            margin: 3px;
        }

        .cd__main {
            background: #fff;
            padding: 20px;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;

        }

        .cd__main {
            display: flex;
            width: 100%;
        }

        @media only screen and (min-width: 1360px) {
            .cd__main {
                max-width: 1280px;
                margin-left: auto;
                margin-right: auto;
                padding: 24px;
            }
        }
    </style>
</head>

<body>
    <header class="cd__intro">
        <h1> Invoice Template Example </h1>
        <p> Invoice Template </p>
        <div class="cd__action">
            <a href="https://www.codehim.com/html5-css3/simple-invoice-template-html-css"
                title="Back to download and tutorial page" class="cd__btn back">Back to Tutorial</a>
        </div>
    </header>
    <!--$%adsense%$-->
    <main class="cd__main">
        <!-- Start DEMO HTML (Use the following code into your project)-->
        <div class="container invoice">
            <div class="invoice-header">
                <div class="row">
                    <div class="col-xs-8">
                        <h1>Invoice <small>With Credit</small></h1>
                        <h4 class="text-muted">NO: 554775/R1 | Date: 01/01/2015</h4>
                    </div>
                    <div class="col-xs-4">
                        <div class="media">
                            <div class="media-left">
                                <img class="media-object logo" src="https://dummyimage.com/70x70/000/fff&text=ACME" />
                            </div>
                            <ul class="media-body list-unstyled">
                                <li><strong>Acme Corporation</strong></li>
                                <li>Software Development</li>
                                <li>Field 3, Moon</li>
                                <li>info@acme.com</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="invoice-body">
                <div class="row">
                    <div class="col-xs-5">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title">Company Details</h3>
                            </div>
                            <div class="panel-body">
                                <dl class="dl-horizontal">
                                    <dt>Name</dt>
                                    <dd><strong>Acme Corporation</strong></dd>
                                    <dt>Industry</dt>
                                    <dd>Software Development</dd>
                                    <dt>Address</dt>
                                    <dd>Field 3, Moon</dd>
                                    <dt>Phone</dt>
                                    <dd>123.4456.4567</dd>
                                    <dt>Email</dt>
                                    <dd>mainl@acme.com</dd>
                                    <dt>Tax NO</dt>
                                    <dd class="mono">123456789</dd>
                                    <dt>Tax Office</dt>
                                    <dd>A' Moon</dd>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-7">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title">Customer Details</h3>
                            </div>
                            <div class="panel-body">
                                <dl class="dl-horizontal">
                                    <dt>Name</dt>
                                    <dd>Microsoft Corporation</dd>
                                    <dt>Industry</dt>
                                    <dd>Software Development</dd>
                                    <dt>Address</dt>
                                    <dd>One Microsoft Way Redmond, WA 98052-7329, USA</dd>
                                    <dt>Phone</dt>
                                    <dd>(425) 882-8080</dd>
                                    <dt>Email</dt>
                                    <dd>contact@microsoft.com</dd>
                                    <dt>Tax NO</dt>
                                    <dd class="mono">123456789</dd>
                                    <dt>&nbsp;</dt>
                                    <dd>&nbsp;</dd>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Services / Products</h3>
                    </div>
                    <table class="table table-bordered table-condensed">
                        <thead>
                            <tr>
                                <th>Item / Details</th>
                                <th class="text-center colfix">Unit Cost</th>
                                <th class="text-center colfix">Sum Cost</th>
                                <th class="text-center colfix">Discount</th>
                                <th class="text-center colfix">Tax</th>
                                <th class="text-center colfix">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Lorem Ipsum Dolor
                                    <br>
                                    <small class="text-muted">The best lorem in town, try it now or leave
                                        forever</small>
                                </td>
                                <td class="text-right">
                                    <span class="mono">$1,000.00</span>
                                    <br>
                                    <small class="text-muted">Before Tax</small>
                                </td>
                                <td class="text-right">
                                    <span class="mono">$18,000.00</span>
                                    <br>
                                    <small class="text-muted">18 Units</small>
                                </td>
                                <td class="text-right">
                                    <span class="mono">- $1,800.00</span>
                                    <br>
                                    <small class="text-muted">Special -10%</small>
                                </td>
                                <td class="text-right">
                                    <span class="mono">+ $3,240.00</span>
                                    <br>
                                    <small class="text-muted">VAT 20%</small>
                                </td>
                                <td class="text-right">
                                    <strong class="mono">$19,440.00</strong>
                                    <br>
                                    <small class="text-muted mono">$16,200.00</small>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    Sit Amet Dolo
                                    <br>
                                    <small class="text-muted">Now you may sit</small>
                                </td>
                                <td class="text-right">
                                    <span class="mono">$120.00</span>
                                    <br>
                                    <small class="text-muted">Before Tax</small>
                                </td>
                                <td class="text-right">
                                    <span class="mono">$240.00</span>
                                    <br>
                                    <small class="text-muted">2 Units</small>
                                </td>
                                <td class="text-right">
                                    <span class="mono">- $0.00</span>
                                    <br>
                                    <small class="text-muted">-</small>
                                </td>
                                <td class="text-right">
                                    <span class="mono">+ $72.00</span>
                                    <br>
                                    <small class="text-muted">VAT:20% S:10%</small>
                                </td>
                                <td class="text-right">
                                    <strong class="mono">$312.00</strong>
                                    <br>
                                    <small class="text-muted mono">$240.00</small>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="panel panel-default">
                    <table class="table table-bordered table-condensed">
                        <thead>
                            <tr>
                                <td class="text-center col-xs-1">Sub Total</td>
                                <td class="text-center col-xs-1">Discount</td>
                                <td class="text-center col-xs-1">Total</td>
                                <td class="text-center col-xs-1">Tax</td>
                                <td class="text-center col-xs-1">Final</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th class="text-center rowtotal mono">$18,240.00</th>
                                <th class="text-center rowtotal mono">-$1,800.00</th>
                                <th class="text-center rowtotal mono">$16,440.00</th>
                                <th class="text-center rowtotal mono">$3,312.00</th>
                                <th class="text-center rowtotal mono">$19,752.00</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row">
                    <div class="col-xs-7">
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <i>Comments / Notes</i>
                                <hr style="margin:3px 0 5px" /> Lorem ipsum dolor sit amet, consectetur adipisicing
                                elit. Odit repudiandae numquam sit facere blanditiis, quasi distinctio ipsam? Libero
                                odit ex expedita, facere sunt, possimus consectetur dolore, nobis iure amet vero.
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-5">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title">Payment Method</h3>
                            </div>
                            <div class="panel-body">
                                <p>For your convenience, you may deposite the final ammount at one of our banks</p>
                                <ul class="list-unstyled">
                                    <li>Alpha Bank - <span class="mono">MO123456789456123</span></li>
                                    <li>Beta Bank - <span class="mono">MO123456789456123</span></li>
                                    <li>Gamma Bank - <span class="mono">MO123456789456123</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="invoice-footer">
                Thank you for choosing our services.
                <br /> We hope to see you again soon
                <br />
                <strong>~ACME~</strong>
            </div>
        </div>
        <!-- END EDMO HTML (Happy Coding!)-->
    </main>
    <footer class="cd__credit">Author: Christos Georgiou - Distributed By: <a title="Free web design code & scripts"
            href="https://www.codehim.com?source=demo-page" target="_blank">CodeHim</a></footer>

</body>

</html>
