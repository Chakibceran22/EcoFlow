import 'package:eco_flow/constant.dart';
import 'package:flutter/material.dart';

class Saved extends StatelessWidget {
  const Saved({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Saved",
          style: TextStyle(
              color: Colors.black, fontSize: 20, fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
        backgroundColor: background,
        elevation: 0,
      ),
      body: Center(
        child: Text("There is no Saved trips yet"),
      ),
    );
  }
}
