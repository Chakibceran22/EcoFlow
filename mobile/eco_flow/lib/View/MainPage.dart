import 'package:animated_bottom_navigation_bar/animated_bottom_navigation_bar.dart';
import 'package:eco_flow/View/Saved.dart';
import 'package:eco_flow/View/Subscribe.dart';
import 'package:eco_flow/View/Tracking.dart';
import 'package:eco_flow/View/Profile.dart';
import 'package:eco_flow/constant.dart';
import 'package:flutter/material.dart';

class Main extends StatefulWidget {
  const Main({super.key});

  @override
  State<Main> createState() => _MainState();
}

class _MainState extends State<Main> {
  int _bottomNavIndex = 0;

  @override
  Widget build(BuildContext context) {
    //Icons
    List iconList = [
      Icons.home,
      Icons.card_membership,
      Icons.bookmark,
      Icons.person
    ];
    //Page Names
    List page_name = ["Home", "Subscrib", "Saved", "Profile"];
    //Pages
    List<Widget> pages = [HomePage(), Subscribe(), Saved(), ProfilePage()];

    return Scaffold(
        body: IndexedStack(
          index: _bottomNavIndex,
          children: pages,
        ),
        floatingActionButton: FloatingActionButton(
          backgroundColor: green,
          onPressed: () {},
          shape: CircleBorder(),
          child: Icon(
            Icons.qr_code_2,
            color: Colors.white,
          ),
          //params
        ),
        floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
        bottomNavigationBar: AnimatedBottomNavigationBar.builder(
          height: 60,
          itemCount: 4,
          tabBuilder: (int index, bool isActive) {
            return Column(
              children: [
                Container(
                  margin: EdgeInsets.only(top: 6),
                  child: Icon(
                    iconList[index],
                    size: 28,
                    color: _bottomNavIndex == index ? green : Colors.grey,
                  ),
                ),
                Text(
                  page_name[index],
                  style: TextStyle(
                    fontWeight: FontWeight.w500,
                    fontSize: 11,
                  ),
                )
              ],
            );
          },
          activeIndex: _bottomNavIndex,
          gapLocation: GapLocation.center,

          onTap: (index) => setState(() {
            _bottomNavIndex = index;
          }),
          //other params
        ));
  }
}
