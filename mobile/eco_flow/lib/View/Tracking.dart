import 'package:eco_flow/Models/schedule.dart';
import 'package:eco_flow/constant.dart';
import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

final List<String> locations = [
  "Location 1 - Algiers",
  "Location 2 - Oran",
  "Location 3 - Constantine",
  "Location 4 - Annaba",
  "Location 5 - Blida"
];
final LatLng departure = LatLng(51.5074, -0.1278); // London
final LatLng destination = LatLng(40.515, -0.120); // Nearby location
final String duration = "10 min"; // Example duration

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        floatingActionButton: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.end, // Align to the right
          children: [
            FloatingActionButton(
              onPressed: () async {
                await showSchedule(context);
              },
              child: Container(
                padding: EdgeInsets.all(13),
                decoration: BoxDecoration(
                    color: background, borderRadius: BorderRadius.circular(8)),
                child: Icon(
                  Icons.calendar_month,
                  color: Colors.green, // Localisation en vert
                  size: 30,
                ),
              ), // First button (Scheduler)
            ),
            SizedBox(height: 16), // Space between buttons
            FloatingActionButton(
              onPressed: () {},
              child: Container(
                padding: EdgeInsets.all(13),
                decoration: BoxDecoration(
                    color: background, borderRadius: BorderRadius.circular(8)),
                child: Icon(
                  Icons.location_on,
                  color: Colors.green, // Localisation en vert
                  size: 30,
                ),
              ), // Second button (Location)
            ),
          ],
        ),
        floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
        body: FlutterMap(options: MapOptions(), children: [
          TileLayer(
            urlTemplate: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            subdomains: ['a', 'b', 'c'],
          ),
          // SEARCH FIELDS (ON TOP)
          PolylineLayer(
            polylines: [
              Polyline(
                points: [departure, destination], // Draw line between markers
                color: Colors.red,
                strokeWidth: 4.0,
              ),
            ],
          ),
          MarkerLayer(
            // ✅ Correct way to add markers
            markers: [
              Marker(
                  point: departure,
                  child:
                      Icon(Icons.location_on, color: Colors.green, size: 40)),
              Marker(
                  point: destination,
                  child: Icon(Icons.location_on, color: Colors.green, size: 40))
            ],
          ),
          RichAttributionWidget(
            attributions: [
              TextSourceAttribution(
                '© OpenStreetMap contributors',
                onTap: () => print('OpenStreetMap tapped'),
              ),
            ],
          ),
          Positioned(
            top: 40,
            left: 20,
            right: 20,
            child: InkWell(
              onTap: () {},
              child: Column(
                children: [
                  // Departure Field
                  // Destination Field
                  TextField(
                    decoration: InputDecoration(
                      prefixIcon: Icon(Icons.my_location, color: Colors.green),
                      hintText: "Departure",
                      filled: true,
                      fillColor: Colors.white,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none,
                      ),
                      contentPadding:
                          EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                      hintStyle:
                          TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
                    ),
                  ),
                  SizedBox(height: 8), // Space between fields

                  // Destination Field
                  TextField(
                    decoration: InputDecoration(
                      hintText: "Destination",
                      prefixIcon:
                          Icon(Icons.location_on, color: Colors.lightGreen),
                      filled: true,
                      fillColor: Colors.white,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none,
                      ),
                      contentPadding:
                          EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                      hintStyle:
                          TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
                    ),
                  )
                ],
              ),
            ),
          ),
        ]));
  }

  Future<dynamic> showSchedule(BuildContext context) {
    return showModalBottomSheet(
      context: context,
      backgroundColor: background,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) {
        int _selected_Type = 0; // Variable d'état locale

        return StatefulBuilder(
          builder: (context, setState) {
            // Utiliser setState de StatefulBuilder
            return Padding(
              padding: const EdgeInsets.all(16.0),
              child: SingleChildScrollView(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      "Schedule",
                      style:
                          TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 12),
                    Container(
                      margin: EdgeInsets.symmetric(vertical: 8.0),
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(8),
                          color: Colors.white),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        mainAxisSize: MainAxisSize.min,
                        children: ['Bus', 'Train', 'Tramway'].map((tab) {
                          int type = ['Bus', 'Train', 'Tramway'].indexOf(tab);
                          return GestureDetector(
                            onTap: () {
                              setState(() {
                                // Mettre à jour l'état avec StatefulBuilder
                                _selected_Type = type;
                              });
                            },
                            child: Container(
                              padding: EdgeInsets.symmetric(
                                  horizontal: 16, vertical: 8),
                              decoration: BoxDecoration(
                                color: _selected_Type == type
                                    ? Colors.lightGreen[100]
                                    : Colors.transparent,
                                borderRadius: BorderRadius.circular(8.0),
                              ),
                              child: Text(
                                tab,
                                style: TextStyle(
                                  fontSize: 12.0,
                                  fontWeight: FontWeight.bold,
                                  color: _selected_Type == type
                                      ? Colors.green
                                      : Colors.black,
                                ),
                              ),
                            ),
                          );
                        }).toList(),
                      ),
                    ),
                    ListView.builder(
                      shrinkWrap: true,
                      itemCount: busList.length,
                      itemBuilder: (context, index) {
                        return Column(
                          children: [
                            Container(
                              decoration: BoxDecoration(
                                  border: Border.all(color: Color(0xffeeefef)),
                                  borderRadius: BorderRadius.circular(15)),
                              child: Padding(
                                padding: const EdgeInsets.all(12.0),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        Row(
                                          children: [
                                            Icon(Icons.directions_bus,
                                                color: Colors.green),
                                            SizedBox(width: 8),
                                            Text(
                                              "Bus Nº  ${busList[index].numero}",
                                              style: TextStyle(
                                                fontWeight: FontWeight.bold,
                                                fontSize: 16,
                                              ),
                                            ),
                                          ],
                                        ),
                                        Row(
                                          children: [
                                            Icon(Icons.schedule,
                                                color: Colors.purple, size: 18),
                                            SizedBox(width: 4),
                                            Text(
                                              "Next arrival: Today /  ${busList[index].time}",
                                              style: TextStyle(
                                                  fontSize: 12,
                                                  color: Colors.grey[700]),
                                            ),
                                          ],
                                        ),
                                      ],
                                    ),
                                    SizedBox(height: 8),
                                    Row(
                                      children: [
                                        Icon(Icons.arrow_forward,
                                            size: 16, color: Colors.black54),
                                        SizedBox(width: 4),
                                        Text(
                                          "From:  ${busList[index].departure}",
                                          style: TextStyle(
                                              fontSize: 14,
                                              color: Colors.black87),
                                        ),
                                      ],
                                    ),
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        Row(
                                          children: [
                                            Icon(Icons.arrow_upward,
                                                size: 16,
                                                color: Colors.black54),
                                            SizedBox(width: 4),
                                            Text(
                                              "To:  ${busList[index].destination}",
                                              style: TextStyle(
                                                  fontSize: 14,
                                                  color: Colors.black87),
                                            ),
                                          ],
                                        ),
                                        Icon(Icons.bookmark)
                                      ],
                                    ),
                                    SizedBox(height: 8),
                                  ],
                                ),
                              ),
                            ),
                            SizedBox(
                              height: 8,
                            )
                          ],
                        );
                      },
                    ),
                  ],
                ),
              ),
            );
          },
        );
      },
    );
  }
}
