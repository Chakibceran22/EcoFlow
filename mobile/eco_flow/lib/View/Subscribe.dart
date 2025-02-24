import 'package:eco_flow/Models/subscription.dart';
import 'package:eco_flow/constant.dart';
import 'package:flutter/material.dart';

class Subscribe extends StatefulWidget {
  const Subscribe({super.key});

  @override
  State<Subscribe> createState() => _SubscribeState();
}

class _SubscribeState extends State<Subscribe> {
  // List of tabs
  final List<String> _tabs = ['All', 'Bus', 'Train', 'Tram'];
  int _selectedIndex = 0; // Tracks the selected tab index

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(
            "Subscription",
            style: TextStyle(
                color: Colors.black, fontSize: 20, fontWeight: FontWeight.bold),
          ),
          centerTitle: true,
          backgroundColor: background,
          elevation: 0,
        ),
        body: Column(
          children: [
            SizedBox(
              height: 8,
            ),
            Container(
              margin: EdgeInsets.symmetric(vertical: 8.0),
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(8), color: Colors.white),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                mainAxisSize: MainAxisSize.min,
                children: ['All', 'Bus', 'Train', 'Tramway'].map((tab) {
                  int index = ['All', 'Bus', 'Train', 'Tram'].indexOf(tab);
                  return GestureDetector(
                    onTap: () {
                      setState(() {
                        _selectedIndex = index; // Update selected tab
                      });
                    },
                    child: Container(
                      padding: EdgeInsets.only(
                          left: 16, right: 16, top: 8, bottom: 8),
                      decoration: BoxDecoration(
                        color: _selectedIndex == index
                            ? Colors.lightGreen[100]
                            : Colors.transparent,
                        borderRadius: BorderRadius.circular(8.0),
                      ),
                      child: Text(
                        tab,
                        style: TextStyle(
                          fontSize: 14.0,
                          fontWeight: FontWeight.bold,
                          color: _selectedIndex == index ? green : Colors.black,
                        ),
                      ),
                    ),
                  );
                }).toList(),
              ),
            ),
            SizedBox(
              height: 12,
            ),
            Expanded(
                child: ListView.builder(
              padding: EdgeInsets.only(left: 8, right: 8),
              itemCount: subscriptions.length,
              itemBuilder: (context, index) {
                return Card(
                  color: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12.0),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Name on the left, Price on the right
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              subscriptions[index].offerName,
                              style: TextStyle(
                                fontSize: 14.0,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Text(
                              '\$${subscriptions[index].price}',
                              style: TextStyle(
                                fontSize: 16.0,
                                fontWeight: FontWeight.bold,
                                color: Colors.green,
                              ),
                            ),
                          ],
                        ),
                        SizedBox(height: 8.0),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'Type: ${subscriptions[index].type}',
                                  style: TextStyle(fontSize: 14.0),
                                ),
                                SizedBox(height: 2.0),
                                Text(
                                  'Duration: ${subscriptions[index].duration}',
                                  style: TextStyle(fontSize: 14.0),
                                ),
                              ],
                            ),
                            ElevatedButton(
                              onPressed: () {
                                // Your subscription action
                              },
                              style: ElevatedButton.styleFrom(
                                  backgroundColor:
                                      Color(0xFF4CAF50), // Green background
                                  foregroundColor: Colors.white, // White text
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(
                                        16), // Rounded corners
                                  ),
                                  padding: EdgeInsets.only(left: 8, right: 8)),
                              child: Text(
                                "Subscribe",
                                style: TextStyle(
                                    fontSize: 12, fontWeight: FontWeight.bold),
                              ),
                            )
                          ],
                        ),
                      ],
                    ),
                  ),
                );
              },
            ))
          ],
        ));
  }
}
