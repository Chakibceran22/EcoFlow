import 'package:flutter/material.dart';

//Search Field Main

SearchField(context) {
  return Container(
    width: MediaQuery.of(context).size.width - 32,
    margin: EdgeInsets.only(left: 16, right: 16),
    child: Padding(
      padding: const EdgeInsets.all(8.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Container(
            padding: EdgeInsets.only(left: 8),
            child: Text(
              "Search attractions...",
              style: TextStyle(
                  fontSize: 16,
                  color: const Color.fromARGB(255, 138, 136, 136)),
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(top: 2, bottom: 2, right: 8.0),
            child: Icon(Icons.search),
          )
        ],
      ),
    ),
    decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(
          20,
        ),
        color: Colors.white),
  );
}

//Depart && Destination Field

DepartSearch() {
  return null;
}
