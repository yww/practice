<!--Highlight navigation bar -->
<script type="text/javascript">  
$(function() {  
$("a[href='latest_results']").parent("li").addClass('active');  
});  
</script>
<link rel="stylesheet" href="<?=$assets_path;?>css/scroll-table.css" />
<script src="<?=$assets_path;?>js/scroll-table.js"></script>
<script src="<?=$assets_path;?>js/requests_pie_chart.js"></script>
<script src="<?=$assets_path;?>js/highcharts.js"></script>
<script src="<?=$assets_path;?>js/exporting.js"></script>
<script src="<?=$assets_path;?>js/timelinechart.js"></script>

<!-- page content -->
        <div class="right_col" role="main">


          <div id="page-wrapper">
			<div class="container-fluid">
				<!-- Page Heading -->
				<div class="row">
					<div class="col-lg-12">
						<h1 class="page-header">Dashborad</h1>
						<ol class="breadcrumb">
							<li><i class="fa fa-dashboard"></i> <a href="#">E-Shop Dashboard</a>
							</li>
							<li class="active"><i class="fa fa-dashboard"></i> Latest results</li>
							</li>
						</ol>
					</div>
				</div>

		     	<div class="row" style="text-align:center;margin-bottom:30px">
		            <h1>Performance Testing Center</h1>
		            <h4>Enter a URL to test the load time of that page, analyze it and find bottlenecks.</h4>
		        </div>

		     	<div class="x_content">
		     		<div class="row">
		                <label class="control-label col-md-6 col-sm-12 col-xs-12">URL</label>
		                <label class="control-label col-md-4 col-sm-12 col-xs-12">Browser</label>
		            </div>
		            <div class="row">
		                <div class="col-md-6 col-sm-12 col-xs-12 form-group">
		                    <input type="text" placeholder="Please Enter a Website URL" class="form-control">
		                </div>
		                <div class="col-md-4 col-sm-12 col-xs-12 form-group">
		                    <select id="heard" class="form-control" name="website_chrome_type">
				        		<option value="">Choose One Browser</option>
				        		<option value="Chrome">Chrome</option>
				        		<option value="Firefox">Firefox</option>
				        		<option value="IE11">IE11</option>
				        	</select>
		                </div>
		                <div class="col-md-2 col-sm-6 col-xs-6 form-group">
		                	<button id="test" type="button" class="btn btn-primary" onclick="run_python()">
		                		START TEST
		            		</button>
		            	</div>
		            </div>
		        </div>

		        <div class="clearfix"></div>
				<div class="col-md-12 col-sm-12 col-xs-12" style="margin-top:50px">
	                <div class="x_panel">
	                  	<div class="x_title">
	                    	<h2>Recent tests </h2>
	                    	<div class="clearfix"></div>
	                  	</div>
	                  	<div class="x_content">

	                   		<table class="table table-hover">
	                      		<thead>
			                        <tr>
			                          	<th>#</th>
			                          	<th>URL</th>
			                          	<th>Create_Time</th>
			                        </tr>	
	                      		</thead>
	                      		<tbody>
			                        <tr>
			                          	<th scope="row">1</th>
			                          	<td><a href="<?= $recent_tests[0]["summary_url"] ?>" target="_blank"><?php echo $recent_tests[0]['test_url']; ?></a></td>
			                          	<td><?php echo $recent_tests[0]['create_time']; ?></td>
										
			                        </tr>
			                        <tr>
			                          	<th scope="row">2</th>
			                          	<td><a href="<?= $recent_tests[1]["summary_url"] ?>" target="_blank"><?php echo $recent_tests[1]['test_url']; ?></a></td>
			                          	<td><?php echo $recent_tests[1]['create_time']; ?></td>
			                        </tr>
			                        <tr>
			                          	<th scope="row">3</th>
			                          	<td><a href="<?= $recent_tests[2]["summary_url"] ?>" target="_blank"><?php echo $recent_tests[2]['test_url']; ?></a></td>
			                          	<td><?php echo $recent_tests[2]['create_time']; ?></td>
			                        </tr>
			                        <tr>
			                          	<th scope="row">4</th>
			                          	<td><a href="<?= $recent_tests[3]["summary_url"] ?>" target="_blank"><?php echo $recent_tests[3]['test_url']; ?></a></td>
			                          	<td><?php echo $recent_tests[3]['create_time']; ?></td>
			                        </tr>
			                        <tr>
			                          	<th scope="row">5</th>
			                          	<td><a href="<?= $recent_tests[4]["summary_url"] ?>" target="_blank"><?php echo $recent_tests[4]['test_url']; ?></a></td>
			                          	<td><?php echo $recent_tests[4]['create_time']; ?></td>
			                        </tr>
			                        <tr>
			                          	<th scope="row">6</th>
			                          	<td><a href="<?= $recent_tests[5]["summary_url"] ?>" target="_blank"><?php echo $recent_tests[5]['test_url']; ?></a></td>
			                          	<td><?php echo $recent_tests[5]['create_time']; ?></td>
			                        </tr>
			                        <tr>
			                          	<th scope="row">7</th>
			                          	<td><a href="<?= $recent_tests[6]["summary_url"] ?>" target="_blank"><?php echo $recent_tests[6]['test_url']; ?></a></td>
			                          	<td><?php echo $recent_tests[6]['create_time']; ?></td>
			                        </tr>
			                        <tr>
			                          	<th scope="row">8</th>
			                          	<td><a href="<?= $recent_tests[7]["summary_url"] ?>" target="_blank"><?php echo $recent_tests[7]['test_url']; ?></a></td>
			                          	<td><?php echo $recent_tests[7]['create_time']; ?></td>
			                        </tr>
			                        <tr>
			                          	<th scope="row">9</th>
			                          	<td><a href="<?= $recent_tests[8]["summary_url"] ?>" target="_blank"><?php echo $recent_tests[8]['test_url']; ?></a></td>
			                          	<td><?php echo $recent_tests[8]['create_time']; ?></td>
			                        </tr>
			                        <tr>
			                          	<th scope="row">10</th>
			                          	<td><a href="<?= $recent_tests[9]["summary_url"] ?>" target="_blank"><?php echo $recent_tests[9]['test_url']; ?></a></td>
			                          	<td><?php echo $recent_tests[9]['create_time']; ?></td>
			                        </tr>
			                    </tbody>
			                </table>
			            </div>
			        </div>
			    </div>		

			    <div class="clearfix"></div>
              	<div class="col-md-7 col-sm-7 col-xs-12">
                	<div class="x_panel">
                  		<div class="x_title">
                    		<h2>State Colors</h2>
                    		<div class="clearfix"></div>
                  		</div>
                  		<div class="x_content">
                    		<table class="table">
		                      <tbody>
		                        	<tr>
		                          		<td><div class="row" style="width:12px; height:12px; background-color:#1f7c83;margin-left:5px"></div></td>
		                          		<td><strong>DNS</strong></td>
		                          		<td>Web browser is looking up DNS information</td>
		                        	</tr>
		                        	<tr>
		                          		<td><div class="row" style="width:12px; height:12px; background-color:#e58226;margin-left:5px"></div></td>
		                          		<td><strong>Connect</strong></td>
		                          		<td>Web browser is connecting to the server</td>
		                        	</tr>
		                        	<tr>
		                          		<td><div class="row" style="width:12px; height:12px; background-color:#c141cd;margin-left:5px"></div></td>
		                          		<td><strong>SSL</strong></td>
		                          		<td>Web browser is performing a SSL handshake</td>
		                        	</tr>
		                        	<tr>
		                          		<td><div class="row" style="width:12px; height:12px; background-color:#1fe11f;margin-left:5px"></div></td>
		                          		<td><strong>First Byte</strong></td>
		                          		<td>Web browser is receiving the first byte</td>
		                        	</tr>
		                        	<tr>
		                          		<td><div class="row" style="width:12px; height:12px; background-color:#1977dd;margin-left:5px"></div></td>
		                          		<td><strong>Download</strong></td>
		                          		<td>Web browser is down;oading data from the server</td>
		                        	</tr>
		                        	<tr>
		                          		<td><div class="row" style="width:12px; height:12px; background-color:#28BC00;margin-left:5px"></div></td>
		                          		<td><strong>Start Render</strong></td>
		                          		<td></td>
		                        	</tr>
		                        	<tr>
		                          		<td><div class="row" style="width:12px; height:12px; background-color:#8FBC83;margin-left:5px"></div></td>
		                          		<td><strong>msFirstPaint</strong></td>
		                          		<td></td>
		                        	</tr>
		                        	<tr>
		                          		<td><div class="row" style="width:12px; height:12px; background-color:#D888DF;margin-left:5px"></div></td>
		                          		<td><strong>DOM Content Loaded</strong></td>
		                          		<td></td>
		                        	</tr>
		                        	<tr>
		                          		<td><div class="row" style="width:12px; height:12px; background-color:#C0C0FF;margin-left:5px"></div></td>
		                          		<td><strong>On Load</strong></td>
		                          		<td></td>
		                        	</tr>
		                        	<tr>
		                          		<td><div class="row" style="width:12px; height:12px; background-color:#0000FF;margin-left:5px"></div></td>
		                          		<td><strong>Document Complete</strong></td>
		                          		<td></td>
		                        	</tr>
		                      	</tbody>
		                    </table>
		                </div>
		            </div>
		            <div class="x_panel">
                  		<div class="x_title">
                    		<h2>Server Response Codes</h2>
                    		<div class="clearfix"></div>
                  		</div>
                  		<div class="x_content">
                    		<table class="table">
		                      <tbody>
		                        	<tr>
		                          		<td>
		                          		<div class="row" style="background-color:#ffff60;margin-left:5px;font-color:black">3xx</div></td>
		                          		<td><strong>3XX</strong></td>
		                          		<td>The request was redirected to another target</td>
		                        	</tr>
		                        	<tr>
		                          		<td><div class="row" style="background-color:#ff6060;margin-left:5px;font-color:black">4xx</div></td>
		                          		<td><strong>4XX</strong></td>
		                          		<td>	A client error occured, for example 404 page not found</td>
		                        	</tr>
		                      	</tbody>
		                    </table>
		                </div>
		            </div>
		        </div>

              	<div class="col-md-5 col-sm-5 col-xs-12">
                	<h3>Nobody Likes a Slow Website</h3>
	                <p>We built this Website Speed Test to help you analyze the load speed of your websites and learn how to make
	                    them faster. It lets you identify what about a web page is fast, slow, too big, what best practices you’re
	                    not following, and so on. We have tried to make it useful both to experts and novices alike.</p>
	                <p>In short, we wanted it to be a easy-to-use tool to help webmasters and web developers everywhere optimize the performance of their websites.</p>

	                <h4>Feature Overview</h4>
	                <ul>
	                    <li><strong>Examine all parts of a web page</strong> – View file sizes, load times, and other details about
	                        every single element of a web page (HTML, JavaScript and CSS files, images, etc.). You can sort and
	                        filter this list in different ways to identify performance bottlenecks.
	                    </li>
	                    <li><strong>Performance overview</strong> – We automatically put together plenty of performance-related
	                        statistics for you based on the test result
	                    </li>
	                    <li><strong>Performance grade and tips</strong> – See how your website conforms to performance best
	                        practices from Google Page Speed (similar to Yahoo’s Yslow). You can get some great tips on how to speed
	                        up your website this way.
	                    </li>
	                    <li><strong>Trace your performance history</strong> – We save each test for you so you can review it later
	                        and also see how things change over time (with pretty charts!).
	                    </li>
	                    <li><strong>Test from multiple locations</strong> – See how fast a website loads in Europe, the United
	                        States, etc.
	                    </li>
	                    <li><strong>Share your results</strong> – We’ve made it easy for you to perform a test and share it with
	                        your friends, work colleagues or web host.
	                    </li>
	                </ul>

	                <h4>How it works</h4>
	                <p>All tests are done with real web browsers, so the results match the end-user experience exactly. We use a
	                    bunch of instances of Google’s Chrome web browser to load websites, record performance data, and so on.
	                    Tests are done from dedicated Pingdom servers.</p>
	            </div>	

				<!--
				<div class="row">
	                <div class="col-lg-3 col-md-6">
	                    <div class="panel panel-primary">
	                        <div class="panel-heading">
	                            <div class="row">
	                                <div class="col-xs-3">
	                                    <i class="fa fa-comments fa-5x"></i>
	                                </div>
	                                <div class="col-xs-9 text-right">
	                                    <div class="huge"><?php echo $latest_result[0];?></div>
	                                    <div>ms</div>
	                                </div>
	                            </div>
	                        </div>
	                        <a href="#">
	                            <div class="panel-footer">
	                                <span class="pull-left">Time To First Byte</span>
	                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
	                                <div class="clearfix"></div>
	                            </div>
	                        </a>
	                    </div>
	                </div>
	                <div class="col-lg-3 col-md-6">
	                    <div class="panel panel-green">
	                        <div class="panel-heading">
	                            <div class="row">
	                                <div class="col-xs-3">
	                                    <i class="fa fa-tasks fa-5x"></i>
	                                </div>
	                                <div class="col-xs-9 text-right">
	                                    <div class="huge"><?php echo $latest_result[1];?></div>
	                                    <div>ms</div>
	                                </div>
	                            </div>
	                        </div>
	                        <a href="#">
	                            <div class="panel-footer">
	                                <span class="pull-left">Start Rendering</span>
	                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
	                                <div class="clearfix"></div>
	                            </div>
	                        </a>
	                    </div>
	                </div>
	                <div class="col-lg-3 col-md-6">
	                    <div class="panel panel-yellow">
	                        <div class="panel-heading">
	                            <div class="row">
	                                <div class="col-xs-3">
	                                    <i class="fa fa-shopping-cart fa-5x"></i>
	                                </div>
	                                <div class="col-xs-9 text-right">
	                                    <div class="huge"><?php echo $latest_result[2];?></div>
	                                    <div>ms</div>
	                                </div>
	                            </div>
	                        </div>
	                        <a href="#">
	                            <div class="panel-footer">
	                                <span class="pull-left">Document Complete Time</span>
	                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
	                                <div class="clearfix"></div>
	                            </div>
	                        </a>
	                    </div>
	                </div>
	                <div class="col-lg-3 col-md-6">
	                    <div class="panel panel-red">
	                        <div class="panel-heading">
	                            <div class="row">
	                                <div class="col-xs-3">
	                                    <i class="fa fa-support fa-5x"></i>
	                                </div>
	                                <div class="col-xs-9 text-right">
	                                    <div class="huge"><?php echo $latest_result[3];?></div>
	                                    <div>ms</div>
	                                </div>
	                            </div>
	                        </div>
	                        <a href="#">
	                            <div class="panel-footer">
	                                <span class="pull-left">Fully Loaded Time</span>
	                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
	                                <div class="clearfix"></div>
	                            </div>
	                        </a>
	                    </div>
	                </div>
	            </div>
	            -->
                
				<form name="chartForm" action="<?php $_PHP_SELF ?>" method="post">	
				<div class="col-lg-12" align="center">
						<label>Test Page:</label><?= $dropdownlist_pages?>
				</div>
				
				<div class="row">
					<div class="col-lg-12">
						<div class="panel panel-primary">
							<div class="panel-heading">
								<h3 class="panel-title">
									<i class="fa fa-long-arrow-right"></i> Snapshot Comparison
								</h3>
							</div>
							<div class="panel-body">
								<div class="form-group">
									<label>Interval Time: </label> <label class="radio-inline"> <input
										type="radio" name="radio_interval" id="radio_short"
										onchange="this.form.submit()" id="optionsRadiosInline1"
										value="0.1" <?php if(isset($_POST['radio_interval']) && $_POST['radio_interval'] == '0.1') echo ' checked="checked"'?>>0.1s
									</label>
									<label class="radio-inline"> <input type="radio"
										onchange="this.form.submit()" name="radio_interval"
										id="radio_normal_half" value="0.5" <?php if(!isset($_POST['radio_interval']) || (isset($_POST['radio_interval']) && $_POST['radio_interval'] == '0.5')) echo ' checked="checked"'?>>0.5s
									</label> 
									<label class="radio-inline"> <input type="radio"
										onchange="this.form.submit()" name="radio_interval"
										id="radio_normal" value="1" <?php if(!isset($_POST['radio_interval']) || (isset($_POST['radio_interval']) && $_POST['radio_interval'] == '1')) echo ' checked="checked"'?>>1s
									</label>
									<label class="radio-inline"> <input type="radio"
										onchange="this.form.submit()" name="radio_interval"
										id="radio_long" value="10" <?php if(isset($_POST['radio_interval']) && $_POST['radio_interval'] == '10') echo ' checked="checked"'?>>10s
									</label>
								</div>

								<!-- Draw table -->
								<div id="table-container">
							      <div class="table-lt">
							        <table>
							          <tbody>
							            <tr>
							              <td>
							                <div>
							                  Browser Type
							                </div>
							              </td>
							            </tr>
							          </tbody>
							        </table>
							      </div>
							      <div class="table-left">
							        <div class="table-mask">
							          <table>
							            <tbody>
							            <?php if(isset($table_ie)) {?>
							              <tr id="IE11">
							                <td height="135">
							                  <div><img width="25" height="25" src="<?=$assets_path;?>img/ie.ico">IE</div>
							                </td>
							              </tr>
							              <?php } ?>

							              <?php if(isset($table_firefox)) {?>
							              <tr id="Firefox">
							                <td height="135"> 
							                  <div><img width="25" height="25" src="<?=$assets_path;?>img/firefox.ico">Firefox</div>
							                </td>
							              </tr>
							              <?php } ?>

							              <?php if(isset($table_chrome)) {?>
							              <tr id="Chrome">
							                <td height="135">
							                  <div><img width="25" height="25" src="<?=$assets_path;?>img/chrome.ico">Chrome</div>
							                </td>
							              </tr>
							              <?php } ?>
							            </tbody>
							          </table>
							        </div>
							      </div>
							      
								  <div class="table-top">
							        <div class="table-mask">
							          <table>
							            <tbody>
							              <tr>
										  <?php
											  for($i=0;$i<20;$i++)
											  {
										  ?>
											<td>
							                  <div><?php echo $i*$interval; ?>s</div>
							                </td>	
										  <?php
										  	  }		  
										  ?>
							              </tr>
							            </tbody>
							          </table>
							        </div>
							      </div>
							      <div class="table-right">
							        <table>
							          <tbody>
							            <tr>
							            <?= $table_ie ?>
							            </tr>
							            <tr>
							            <?= $table_firefox ?>
							            </tr>
										<tr>
							            <?= $table_chrome ?>
							            </tr>
							          </tbody>
							        </table>
							      </div>
								</div>
								<!--End Draw table -->      
							</div>
						<!--End panel-body-->      								
						</div>
					</div>
				</div>
			</div>

			<?php if(!isset($flag)) {?>
			<p>
				Browser: <strong>Chrome</strong>  | Compare Time:  <strong>Last</strong>(<?php if(isset($last_date)) echo $last_date;?>) VS <strong>Current</strong>(<?php if(isset($cur_date)) echo $cur_date;?>)  
		    </p>
			<div class="row ">
				<div class="col-lg-4">
					<div class="panel panel-primary">
						<div class="panel-heading">
							<h3 class="panel-title">
								<i class="fa fa-long-arrow-right"></i> Metrics
							</h3>
						</div>
						<div class="panel-body">
							<div class="table-responsive">
								<table class="table table-bordered table-hover table-striped">
									<thead>
										<tr>
											<th></th>
											<th>Last</th>
											<th>Current</th>
											<th>Comparison</th>
										</tr>
									</thead>
									<tbody>
										<?php
										if(isset($metrics_table))
							            	echo $metrics_table;
										?>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				
				<div class="col-lg-4">
					<div class="panel panel-primary">
						<div class="panel-heading">
							<h3 class="panel-title">
								<i class="fa fa-long-arrow-right"></i> Request Number
							</h3>
						</div>
						<div class="panel-body">
							<div class="table-responsive">
								<table class="table table-bordered table-hover table-striped">
									<thead>
										<tr>
											<th></th>
											<th>Last</th>
											<th>Current</th>
											<th>Comparison</th>
										</tr>
									</thead>
									<tbody>
									<?php
										if(isset($request_table))
							            	echo $request_table;
										?>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				
				<div class="col-lg-4">
					<div class="panel panel-primary">
						<div class="panel-heading">
							<h3 class="panel-title">
								<i class="fa fa-long-arrow-right"></i> Request Size
							</h3>
						</div>
						<div class="panel-body">
							<div class="table-responsive">
								<table class="table table-bordered table-hover table-striped">
									<thead>
										<tr>
											<th></th><!--  Optimization  -->
											<th>Last</th>
											<th>Current</th>
											<th>Comparison</th>
										</tr>
									</thead>
									<tbody>
									<?php
										if(isset($request_size_table))
							            	echo $request_size_table;
										?>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</form>
				<!-- end row -->
			</div>
			<?php } ?>
			<!-- container-fluid -->
		</div>
	</div>
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" 
	   aria-labelledby="myModalLabel" aria-hidden="true">
	    <div class="modal-dialog">
	        <div class="modal-content">
	            <div class="modal-header">
		            <button type="button" class="close" 
		               data-dismiss="modal" aria-hidden="true">
		                  &times;
		            </button>
		            <h4 class="modal-title" id="myModalLabel">
		                Test a website's performance
		            </h4>
	         	</div>
	         	<div class="modal-body">
		         	<form>
					    <input id="modal-input" class="form-control" type="text" name="website_url" placeholder="Please Enter a Website URL">
					    <!-- <label class="control-label" style="margin-top:30px">Please select a browser type:</label> -->
		        		<select id="modal-select" class="form-control" name="website_chrome_type">
			        		<option value="Chrome">Chrome</option>
			        		<option value="Firefox">Firefox</option>
			        		<option value="IE11">IE11</option>
			        	</select>
		         	</div>
	         	</form>
	         	<div class="modal-footer">
		            <button type="button" class="btn btn-default" 
		               data-dismiss="modal">CLOSE
		            </button>
		            <button id="test" type="button" class="btn btn-primary" onclick="run_python()">
		               START TEST
		            </button>
		        </div>
	      	</div><!-- /.modal-content -->
		</div><!-- /.modal -->
	</div>
</div>
<!-- /page content -->





<!-- <script>
	if (!$table_ie) 
	{
		document.getElementById('IE11').display = "none";
	}
	if (!$table_firefox) 
	{
		document.getElementById('Firefox').display = "none";
	}
	if (!$table_chrome) 
	{
		document.getElementById('Chrome').display = "none";
	}
</script> -->