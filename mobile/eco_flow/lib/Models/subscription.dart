import 'package:flutter/material.dart';

class Subscription {
  final String offerName;
  final String price;
  final String type; // Bus, Train, Tram
  final String duration; // 1 month, 3 months, 6 months, 1 year

  Subscription({
    required this.offerName,
    required this.price,
    required this.type,
    required this.duration,
  });
}

List<Subscription> subscriptions = [
  Subscription(
    offerName: "Monthly Bus Pass",
    price: "400 DA",
    type: "Bus",
    duration: "1 month",
  ),
  Subscription(
    offerName: "Quarterly Train Pass",
    price: "1500 DA",
    type: "Train",
    duration: "3 months",
  ),
  Subscription(
    offerName: "Half-Yearly Tram Pass",
    price: "1000 DA",
    type: "Tram",
    duration: "6 months",
  ),
  Subscription(
    offerName: "Annual Multi-Transport Pass",
    price: "6000 DA",
    type: "Bus, Train, Tram",
    duration: "1 year",
  ),
];

subs() {
  return Card(
    elevation: 4.0,
    shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12.0),
        side: BorderSide(color: Colors.green)),
    child: Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            subscriptions[0].offerName,
            style: TextStyle(
              fontSize: 20.0,
              fontWeight: FontWeight.bold,
            ),
          ),
          SizedBox(height: 8.0),
          Text(
            'Type: ${subscriptions[0].type}',
            style: TextStyle(fontSize: 16.0),
          ),
          SizedBox(height: 8.0),
          Text(
            'Duration: ${subscriptions[0].duration}',
            style: TextStyle(fontSize: 16.0),
          ),
          SizedBox(height: 8.0),
          Text(
            'Price: \$${subscriptions[0].price}',
            style: TextStyle(
              fontSize: 18.0,
              fontWeight: FontWeight.bold,
              color: Colors.green,
            ),
          ),
          SizedBox(height: 16.0),
          Center(
            child: ElevatedButton(
              onPressed: () {
                // Handle subscription selection
                // print('Selected: ${subscriptions.offerName}');
              },
              child: Text('Subscribe'),
            ),
          ),
        ],
      ),
    ),
  );
  ;
}
