import 'package:eco_flow/constant.dart';
import 'package:flutter/material.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: background,
      appBar: AppBar(
        title: Text(
          "Profile",
          style: TextStyle(
              color: Colors.black, fontSize: 20, fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
        backgroundColor: background,
        elevation: 0,
      ),
      body: Padding(
        padding: const EdgeInsets.only(left: 16, top: 16, bottom: 16),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "My Card",
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
              ),
              SizedBox(
                height: 8,
              ),
              Container(
                width: MediaQuery.of(context).size.width - 32,
                padding: EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.lightGreen, // White card background
                  borderRadius: BorderRadius.circular(15), // Rounded corners
                  border:
                      Border.all(color: Colors.grey[300]!), // Light grey stroke
                  boxShadow: [
                    BoxShadow(
                      color: const Color.fromRGBO(0, 0, 0, 0.122),
                      blurRadius: 6,
                      offset: Offset(0, 4),
                    ) // Subtle shadow
                  ],
                ),
                child: Row(
                  children: [
                    // Circle Avatar
                    Container(
                      width: 100,
                      height: 100,
                      decoration: BoxDecoration(
                          color: Colors.grey[300], // Placeholder color
                          shape: BoxShape.circle, // Circular avatar
                          image: DecorationImage(
                              image: NetworkImage(
                                  "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"),
                              fit: BoxFit.cover)),
                    ),
                    SizedBox(width: 15), // Spacing between avatar and info
                    // Information Column
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Attaf Massil', // First + Last Name
                          style: TextStyle(
                            fontSize: 18,
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(height: 5), // Spacing between lines
                        Text(
                          '+213 0675441799', // Phone Number
                          style: TextStyle(
                            fontSize: 14,
                            color: Colors.grey[600],
                          ),
                        ),
                        SizedBox(height: 5), // Spacing between lines
                        Row(
                          children: [
                            Text(
                              'Type: ', // Type
                              style: TextStyle(
                                fontSize: 14,
                                color: Colors.grey[600],
                              ),
                            ),
                            Text(
                              'Monthly Bus Pass', // Type
                              style: TextStyle(
                                  fontSize: 14,
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold),
                            ),
                          ],
                        )
                      ],
                    ),
                  ],
                ),
              ),
              // 🔹 Section 1: Settings
              SizedBox(
                height: 16,
              ),
              buildSectionTitle("Settings"),
              Container(
                padding: EdgeInsets.all(16),
                margin: EdgeInsets.only(right: 16),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(15),
                  color: Colors.white,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    buildListTile(Icons.person, "Personal Information"),
                    buildListTile(Icons.language, "Language"),
                    buildListTile(Icons.dark_mode, "Dark Mode"),
                    buildListTile(Icons.notifications, "Notifications"),
                  ],
                ),
              ),

              SizedBox(height: 20),
              buildSectionTitle("Support"),

              Container(
                padding: EdgeInsets.all(16),
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(15),
                    color: Colors.white),
                margin: EdgeInsets.only(right: 16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    buildListTile(Icons.contact_mail, "Contact Us"),
                    buildListTile(Icons.policy, "Policy"),
                  ],
                ),
              ),
              // 🔹 Section 2: Support

              SizedBox(height: 20),

              // 🔹 Section 3: Logout
              buildSectionTitle("Account"),

              Container(
                  padding: EdgeInsets.all(16),
                  margin: EdgeInsets.only(right: 16),
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(15),
                      color: Colors.white),
                  child:
                      buildListTile(Icons.logout, "Log Out", isLogout: true)),
            ],
          ),
        ),
      ),
    );
  }

  // Function to create section titles
  Widget buildSectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Text(
        title,
        style: TextStyle(fontWeight: FontWeight.w800, fontSize: 15),
      ),
    );
  }

  // Function to create ListTiles
  Widget buildListTile(IconData icon, String text, {bool isLogout = false}) {
    return ListTile(
      contentPadding: EdgeInsets.all(0),
      leading: Icon(icon, color: isLogout ? Colors.red : Colors.lightGreen),
      title: Text(text, style: TextStyle(fontSize: 16)),
      trailing: isLogout
          ? null
          : Icon(
              Icons.arrow_forward_ios,
              size: 16,
              color: green,
            ),
      onTap: () {
        if (isLogout) {
          // Handle Logout action
        }
      },
    );
  }
}
