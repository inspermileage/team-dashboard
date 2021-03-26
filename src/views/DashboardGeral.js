/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// react plugin used to create charts
import { Line, Bar } from 'react-chartjs-2';
import  BarChart from 'variables/charts_bar.js'
import  LineChart from 'variables/charts_line.js'
import axios from 'axios';
import toTimestamp from "function/totimestamp.js"
import toMinutes from "function/tominutes.js"

// reactstrap components
import {
	Button,
	ButtonGroup,
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	Label,
	FormGroup,
	Input,
	Table,
	Row,
	Col,
	UncontrolledTooltip
} from 'reactstrap';

// core components
import { chartExample1, chartExample2, chartExample3} from 'variables/charts.js';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		console.log(props.location.aboutProps);
		
		this.getTelemetrybyRoundId = this.getTelemetrybyRoundId.bind(this); 
		this.state = {
			bigChartData: 'data1',
			telemetry:[],
			telemetry_id: [],
			speed: [],
			distance: [],
			engine_temp: [],
			creation_time: [],
			energy_cons: [],
			rpm: [],
			battery:[],
			avg_speed:[],
			creation_time_timestamp:[],
			race_time: 0,
		};
		this.componentDidMount = this.componentDidMount.bind(this);

		
	}
	setBgChartData = (name) => {
		this.setState({
			bigChartData: name
		});
	};


	

	componentDidMount() {
		this.getTelemetrybyRoundId();
		// console.log(oi);	
	}
	getTelemetrybyRoundId = () => {
		axios
			.get('https://apirestmileage.herokuapp.com/api/telemetry/round/'+ this.props.location?.aboutProps?.roundId)
			.then((response) => {
				console.log(response.data);
				response.data.map((prop, key) => {
					var timestamp = toTimestamp(prop.creation_time);
					this.setState({
						speed: [...this.state.speed,prop.speed],
						telemetry_id: [...this.state.telemetry_id,prop.id],
						distance: [...this.state.distance, prop.distance],
						engine_temp: [...this.state.engine_temp,prop.engine_temp],
						creation_time: [...this.state.creation_time,prop.creation_time],
						energy_cons: [...this.state.energy_cons, prop.energy_cons],
						rpm: [...this.state.rpm, prop.rpm],
						battery:[...this.state.battery, prop.battery],
						avg_speed: [...this.state.avg_speed, prop.avg_speed],
						creation_time_timestamp: [...this.state.creation_time_timestamp,timestamp],
					
						
					})
				})
				this.setState({
					telemetry: response.data,
					race_time: toMinutes(this.state.creation_time_timestamp[this.state.creation_time_timestamp.length-1] - this.state.creation_time_timestamp[0])
				});
				console.log(this.state);
				console.log(this.state.race_time);	
				return;
			})
			.catch(function(error) {
				console.log(error);
				console.log('Deu errado no getRoundInfo :(');
			});
	};

	render() {
		return (
			<>
				<div className="content">
					<Row>
						<Col xs="12">
							<Card className="card-chart">
								<CardHeader>
									<Row>
										<Col className="text-left" sm="6">
											<h5 className="card-category">Total Shipments</h5>
											<CardTitle tag="h2">Performance</CardTitle>
										</Col>
										<Col sm="6">
											<ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
												<Button
													tag="label"
													className={classNames('btn-simple', {
														active: this.state.bigChartData === 'data1'
													})}
													color="info"
													id="0"
													size="sm"
													onClick={() => this.setBgChartData('data1')}
												>
													<input
														defaultChecked
														className="d-none"
														name="options"
														type="radio"
													/>
													<span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
														Accounts
													</span>
													<span className="d-block d-sm-none">
														<i className="tim-icons icon-single-02" />
													</span>
												</Button>
												<Button
													color="info"
													id="1"
													size="sm"
													tag="label"
													className={classNames('btn-simple', {
														active: this.state.bigChartData === 'data2'
													})}
													onClick={() => this.setBgChartData('data2')}
												>
													<input className="d-none" name="options" type="radio" />
													<span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
														Purchases
													</span>
													<span className="d-block d-sm-none">
														<i className="tim-icons icon-gift-2" />
													</span>
												</Button>
												<Button
													color="info"
													id="2"
													size="sm"
													tag="label"
													className={classNames('btn-simple', {
														active: this.state.bigChartData === 'data3'
													})}
													onClick={() => this.setBgChartData('data3')}
												>
													<input className="d-none" name="options" type="radio" />
													<span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
														Sessions
													</span>
													<span className="d-block d-sm-none">
														<i className="tim-icons icon-tap-02" />
													</span>
												</Button>
											</ButtonGroup>
										</Col>
									</Row>
								</CardHeader>
								<CardBody>
									<div className="chart-area">
										<Line
											data={chartExample1[this.state.bigChartData]}
											options={chartExample1.options}
										/>
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col lg="4">
							<Card className="card-chart">
								<CardHeader>
									<h5 className="card-category">Total Shipments</h5>
									<CardTitle tag="h3">
										<i className="tim-icons icon-bell-55 text-info" /> 763,215
									</CardTitle>
								</CardHeader>
								<CardBody>
									<div className="chart-area">
										<Line data={chartExample2.data} options={chartExample2.options} />
									</div>
								</CardBody>
							</Card>
						</Col>
						<Col lg="4">
							<Card className="card-chart">
								<CardHeader>
									<h5 className="card-category">Temperatura x Distância</h5>
									{/* <CardTitle tag="h3">
										<i className="tim-icons icon-delivery-fast text-primary" /> 3,500€
									</CardTitle> */}
								</CardHeader>
								<CardBody>
									<div className="chart-area">
									<LineChart
										data={this.state.engine_temp}
										label={this.state.distance}
										// title="Gabi"
										color="#70CAD1"
									/>
									</div>
								</CardBody>
							</Card>
						</Col>
						<Col lg="4">
						{/* <Bar
							data={{
							labels: this.props.distance,
							datasets: this.props.energy_cons
							}}
							options={{
							legend: {
								display: false
							},
							scales: {
								yAxes: [{
								ticks: {
									max: this.props.maxY,
									min: 0,
									stepSize: 3
									}
								}]
								},
								title: {
								display: this.props.display,
								text: this.props.title
								}
							}}
						/> */}

							<Card className="card-chart">
								<CardHeader>
									<h5 className="card-category">Tempo de Prova</h5>
									<CardTitle tag="h3">
										<i className="tim-icons icon-send text-success" /> {this.state.race_time}
									</CardTitle>
								</CardHeader>
								<CardBody>
									{/* <div className="chart-area">
										<Line data={chartExample4.data} options={chartExample4.options} />
									</div> */}
								</CardBody>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col lg="6" md="12">
							<Card className="card-tasks">
								<CardHeader>
									<h6 className="title d-inline">Tasks(5)</h6>
									<p className="card-category d-inline"> today</p>
									<UncontrolledDropdown>
										<DropdownToggle
											caret
											className="btn-icon"
											color="link"
											data-toggle="dropdown"
											type="button"
										>
											<i className="tim-icons icon-settings-gear-63" />
										</DropdownToggle>
										<DropdownMenu aria-labelledby="dropdownMenuLink" right>
											<DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
												Action
											</DropdownItem>
											<DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
												Another action
											</DropdownItem>
											<DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
												Something else
											</DropdownItem>
										</DropdownMenu>
									</UncontrolledDropdown>
								</CardHeader>
								<CardBody>
									<div className="table-full-width table-responsive">
										<Table>
											<tbody>
												<tr>
													<td>
														<FormGroup check>
															<Label check>
																<Input defaultValue="" type="checkbox" />
																<span className="form-check-sign">
																	<span className="check" />
																</span>
															</Label>
														</FormGroup>
													</td>
													<td>
														<p className="title">Update the Documentation</p>
														<p className="text-muted">Dwuamish Head, Seattle, WA 8:47 AM</p>
													</td>
													<td className="td-actions text-right">
														<Button
															color="link"
															id="tooltip636901683"
															title=""
															type="button"
														>
															<i className="tim-icons icon-pencil" />
														</Button>
														<UncontrolledTooltip
															delay={0}
															target="tooltip636901683"
															placement="right"
														>
															Edit Task
														</UncontrolledTooltip>
													</td>
												</tr>
												<tr>
													<td>
														<FormGroup check>
															<Label check>
																<Input defaultChecked defaultValue="" type="checkbox" />
																<span className="form-check-sign">
																	<span className="check" />
																</span>
															</Label>
														</FormGroup>
													</td>
													<td>
														<p className="title">GDPR Compliance</p>
														<p className="text-muted">
															The GDPR is a regulation that requires businesses to protect
															the personal data and privacy of Europe citizens for
															transactions that occur within EU member states.
														</p>
													</td>
													<td className="td-actions text-right">
														<Button
															color="link"
															id="tooltip457194718"
															title=""
															type="button"
														>
															<i className="tim-icons icon-pencil" />
														</Button>
														<UncontrolledTooltip
															delay={0}
															target="tooltip457194718"
															placement="right"
														>
															Edit Task
														</UncontrolledTooltip>
													</td>
												</tr>
												<tr>
													<td>
														<FormGroup check>
															<Label check>
																<Input defaultValue="" type="checkbox" />
																<span className="form-check-sign">
																	<span className="check" />
																</span>
															</Label>
														</FormGroup>
													</td>
													<td>
														<p className="title">Solve the issues</p>
														<p className="text-muted">
															Fifty percent of all respondents said they would be more
															likely to shop at a company
														</p>
													</td>
													<td className="td-actions text-right">
														<Button
															color="link"
															id="tooltip362404923"
															title=""
															type="button"
														>
															<i className="tim-icons icon-pencil" />
														</Button>
														<UncontrolledTooltip
															delay={0}
															target="tooltip362404923"
															placement="right"
														>
															Edit Task
														</UncontrolledTooltip>
													</td>
												</tr>
												<tr>
													<td>
														<FormGroup check>
															<Label check>
																<Input defaultValue="" type="checkbox" />
																<span className="form-check-sign">
																	<span className="check" />
																</span>
															</Label>
														</FormGroup>
													</td>
													<td>
														<p className="title">Release v2.0.0</p>
														<p className="text-muted">
															Ra Ave SW, Seattle, WA 98116, SUA 11:19 AM
														</p>
													</td>
													<td className="td-actions text-right">
														<Button
															color="link"
															id="tooltip818217463"
															title=""
															type="button"
														>
															<i className="tim-icons icon-pencil" />
														</Button>
														<UncontrolledTooltip
															delay={0}
															target="tooltip818217463"
															placement="right"
														>
															Edit Task
														</UncontrolledTooltip>
													</td>
												</tr>
												<tr>
													<td>
														<FormGroup check>
															<Label check>
																<Input defaultValue="" type="checkbox" />
																<span className="form-check-sign">
																	<span className="check" />
																</span>
															</Label>
														</FormGroup>
													</td>
													<td>
														<p className="title">Export the processed files</p>
														<p className="text-muted">
															The report also shows that consumers will not easily forgive
															a company once a breach exposing their personal data occurs.
														</p>
													</td>
													<td className="td-actions text-right">
														<Button
															color="link"
															id="tooltip831835125"
															title=""
															type="button"
														>
															<i className="tim-icons icon-pencil" />
														</Button>
														<UncontrolledTooltip
															delay={0}
															target="tooltip831835125"
															placement="right"
														>
															Edit Task
														</UncontrolledTooltip>
													</td>
												</tr>
												<tr>
													<td>
														<FormGroup check>
															<Label check>
																<Input defaultValue="" type="checkbox" />
																<span className="form-check-sign">
																	<span className="check" />
																</span>
															</Label>
														</FormGroup>
													</td>
													<td>
														<p className="title">Arival at export process</p>
														<p className="text-muted">Capitol Hill, Seattle, WA 12:34 AM</p>
													</td>
													<td className="td-actions text-right">
														<Button
															color="link"
															id="tooltip217595172"
															title=""
															type="button"
														>
															<i className="tim-icons icon-pencil" />
														</Button>
														<UncontrolledTooltip
															delay={0}
															target="tooltip217595172"
															placement="right"
														>
															Edit Task
														</UncontrolledTooltip>
													</td>
												</tr>
											</tbody>
										</Table>
									</div>
								</CardBody>
							</Card>
						</Col>
						<Col lg="6" md="12">
							<Card>
								<CardHeader>
									<CardTitle tag="h4">Simple Table</CardTitle>
								</CardHeader>
								<CardBody>
									<Table className="tablesorter" responsive>
										<thead className="text-primary">
											<tr>
												<th>Name</th>
												<th>Country</th>
												<th>City</th>
												<th className="text-center">Salary</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Dakota Rice</td>
												<td>Niger</td>
												<td>Oud-Turnhout</td>
												<td className="text-center">$36,738</td>
											</tr>
											<tr>
												<td>Minerva Hooper</td>
												<td>Curaçao</td>
												<td>Sinaai-Waas</td>
												<td className="text-center">$23,789</td>
											</tr>
											<tr>
												<td>Sage Rodriguez</td>
												<td>Netherlands</td>
												<td>Baileux</td>
												<td className="text-center">$56,142</td>
											</tr>
											<tr>
												<td>Philip Chaney</td>
												<td>Korea, South</td>
												<td>Overland Park</td>
												<td className="text-center">$38,735</td>
											</tr>
											<tr>
												<td>Doris Greene</td>
												<td>Malawi</td>
												<td>Feldkirchen in Kärnten</td>
												<td className="text-center">$63,542</td>
											</tr>
											<tr>
												<td>Mason Porter</td>
												<td>Chile</td>
												<td>Gloucester</td>
												<td className="text-center">$78,615</td>
											</tr>
											<tr>
												<td>Jon Porter</td>
												<td>Portugal</td>
												<td>Gloucester</td>
												<td className="text-center">$98,615</td>
											</tr>
										</tbody>
									</Table>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</div>
			</>
		);
	}
}

export default Dashboard;
