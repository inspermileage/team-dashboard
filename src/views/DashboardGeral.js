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
import axios from 'axios';
import { tempo, toMinutes } from "function/tominutes.js";
import toTimestamp from "function/totimestamp.js";
import { MapContainer, Marker, Popup, TileLayer,Rectangle,Polyline,useMap,MapConsumer } from "react-leaflet";
import React from 'react';
// reactstrap components
import {
	Button,
	ButtonGroup,
	Card,
	CardBody, CardHeader,
	CardTitle,
	Col, Row, Center,
} from 'reactstrap';
import LineChart from 'variables/charts_line.js';
import "./leaflet.css";


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
			grafico:[],
			latitude: [],
			longitude: [],
			coordenadas: [],
			eixoy:'',
			activePark: null,
			setActivePark: null,
			latitude_inicial: 0,
			longitude_inicial:0
		};
		
		this.componentDidMount = this.componentDidMount.bind(this);
		// this.MyComponent = this.MyComponent.bind(this);
		this.MyMapComponent = this.MyMapComponent.bind(this);
		
	}
	setBgChartData = (name) => {
		this.setState({
			bigChartData: name
		});
	};


	

	componentDidMount() {
		this.getTelemetrybyRoundId();
		//this.MyMapComponent();
	}
	getTelemetrybyRoundId = () => {
		axios
			.get('https://apirestmileage.herokuapp.com/api/telemetry/round/'+ this.props.location?.aboutProps?.roundId)
			.then((response) => {
				console.log(response.data);
				response.data.map((prop, key) => {
					var timestamp = toTimestamp(prop.creation_time);
					const lista_coordenada = [prop.latitude,prop.longitude];
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
						latitude: [...this.state.latitude, prop.latitude],
						longitude: [...this.state.longitude, prop.longitude],
						coordenadas: [...this.state.coordenadas, lista_coordenada],
						latitude_inicial : this.state.latitude[0],
						longitude_inicial : this.state.longitude[0],
					})
				})
				this.setState({
					telemetry: response.data,
					race_time: toMinutes(this.state.creation_time_timestamp[this.state.creation_time_timestamp.length-1] - this.state.creation_time_timestamp[0]),
					grafico: this.state.energy_cons,
				});
				console.log("Latitudeeeeeeeeeeeeeeeeee");
				console.log(this.state.latitude);
				console.log("Longitudeeeeeee");
				console.log(this.state.longitude);
				console.log("coordenadas");
				console.log(this.state.coordenadas);
				return;
			})
			.catch(function(error) {
				console.log(error);
				console.log('Deu errado no getRoundInfo :(');
			});
	};
	
	  
	
	
	MyMapComponent() {
		var center = [51.505, -0.09];
		var center_insper = [-23.599034, -46.676020];
		var coords_inicial = this.state.coordenadas[0];
		console.log("coords inicial");
		console.log(coords_inicial);
		console.log(this.state.latitude_inicial,this.state.longitude_inicial);
		
		return (
			<MapContainer center={center_insper} zoom={20}>
				
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			/>
			 <Polyline pathOptions={{color:'orange'}} positions={this.state.coordenadas} />
			 {this.state.latitude_inicial != 0 && this.state.longitude_inicial != 0 ?(map)=> map.flyTo(this.state.coordenadas[-1], map.getZoom()) : <div> </div>}
	
		</MapContainer>
		)

		// 		 <MapConsumer>
    //     {(map) => {
    //       //console.log('map center:', map.getCenter())
	// 	  map.setView([0,0]);
	// 	  //map.panTo([this.state.latitude_inicial,this.state.longitude_inicial]);
          
    //     }}
    //   </MapConsumer> : <div>CHATO</div> }
			 {/* /* <MapConsumer>
        {(map) => {
          //console.log('map center:', map.getCenter())
		  //map.setView([this.state.latitude_inicial,this.state.longitude_inicial]);
		  map.panTo([this.state.latitude_inicial,this.state.longitude_inicial]);
          return null
        }}
      </MapConsumer> */ }
		
		
	  }

	render() {
		
		return (
			<>
				<div className="content">
							{this.MyMapComponent()}
						
					<Row>
						<Col xs="12">
							<Card className="card-chart">
								<CardHeader>
									<Row>
										<Col className="text-left" sm="6">
											<h5 className="card-category"></h5>
											<CardTitle tag="h2">Performance</CardTitle>
										</Col>
										<Col sm="6">
											<ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
												<Button
													tag="label"
													color="info"
													id="0"
													size="sm"
													onClick={() => this.setState({grafico:this.state.energy_cons})}
												>
													<input
														defaultChecked
														className="d-none"
														name="options"
														type="radio"
													/>
													<span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
														Consumo
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
													
													onClick={() => this.setState({grafico:this.state.battery})}
												>
													<input className="d-none" name="options" type="radio" />
													<span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
														Bateria
													</span>
													<span className="d-block d-sm-none">
														<i className="tim-icons icon-gift-2" />
													</span>
												</Button>
												
											</ButtonGroup>
										</Col>
									</Row>
								</CardHeader>
								<CardBody>
									<div className="chart-area">

										<LineChart
											data={this.state.grafico}
											label={tempo(this.state.creation_time_timestamp)}
											
											medidax = "Tempo"
											mediday ={(JSON.stringify(this.state.grafico)==JSON.stringify(this.state.battery)) ? "%" : "Kwh"}
											color="#70CAD1"
										/>
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
					<Row>
						
						<Col lg="3">
							<Card className="card-chart">
								<CardHeader>
									<h5 className="card-category">Tempo de Prova</h5>
									<CardTitle tag="h3">
										<i className="tim-icons  icon-time-alarm text-success" /> {this.state.race_time}
									</CardTitle>
								</CardHeader>
								<CardBody>
									
								</CardBody>
							</Card>
							
							<Card className="card-chart">
								<CardHeader>
									<h5 className="card-category">Bateria</h5>
									<CardTitle tag="h3">
										<i className="tim-icons icon-bulb-63 text-success" /> {this.state.battery[this.state.battery.length-1]} %
									</CardTitle>
								</CardHeader>
								<CardBody>
								</CardBody>
							</Card>

							<Card className="card-chart">
								<CardHeader>
									<h5 className="card-category">Velocidade Média</h5>
									<CardTitle tag="h3">
										<i className="tim-icons icon-user-run text-success" /> {this.state.avg_speed[this.state.avg_speed.length-1]} km/h
									</CardTitle>
								</CardHeader>
								<CardBody>
									
								</CardBody>
							</Card>

							<Card className="card-chart">
								<CardHeader>
									<h5 className="card-category">Distância Percorrida</h5>
									<CardTitle tag="h3">
										<i className="tim-icons icon-watch-time text-success" /> {this.state.distance[this.state.distance.length-1]} m
									</CardTitle>
								</CardHeader>
								<CardBody>
									
								</CardBody>
							</Card>
						</Col>
						<Col lg="9">
						<Card className="card-chart">
								<CardHeader>
									<h5 className="card-category">Velocidade instântanea x Tempo</h5>
								
								</CardHeader>
								<CardBody>
									<div className="chart-area">
									<LineChart
										data={this.state.speed}
										label={tempo(this.state.creation_time_timestamp)}

										medidax = "Tempo"
										mediday = "km/h"
										color="#70CAD1"
									/>
									</div>
								</CardBody>
							</Card>
						
						<Row>
						<Col lg="6">
							<Card className="card-chart">
								<CardHeader>
									<h5 className="card-category">Temperatura x Distância</h5>
								
								</CardHeader>
								<CardBody>
									<div className="chart-area">
									<LineChart
										data={this.state.engine_temp}
										label={this.state.distance}
										
										medidax = "m"
										mediday = "ºC"
										color="#70CAD1"
									/>
									</div>
								</CardBody>
							</Card>
						</Col>
						<Col lg="6">
							<Card className="card-chart">
								<CardHeader>
									<h5 className="card-category">RPM x Tempo</h5>
								
								</CardHeader>
								<CardBody>
									<div className="chart-area">
									<LineChart
										data={this.state.rpm}
										label={tempo(this.state.creation_time_timestamp)}
										
										medidax = "Tempo"
										mediday = "RPM"
										color="#70CAD1"
									/>
									</div>
								</CardBody>
							</Card>
						</Col>
						</Row>
						</Col>
						
					</Row>
				
				</div>
			</>
		);
	}
}

export default Dashboard;
