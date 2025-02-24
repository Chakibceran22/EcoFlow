class Schedule {
  final int numero;
  final String type;
  final String nextArrival;
  final String time;
  final String departure;
  final String destination;

  Schedule({
    required this.numero,
    required this.type,
    required this.nextArrival,
    required this.time,
    required this.departure,
    required this.destination,
  });
}

List<Schedule> busList = [
  Schedule(
    numero: 31,
    type: "Bus",
    nextArrival: "Today",
    time: "16:00",
    departure: "Alger,Thafoura.",
    destination: "Alger,Babezzouar",
  ),
  Schedule(
    numero: 45,
    type: "Bus",
    nextArrival: "Today",
    time: "16:30",
    departure: "Alger, Birkhadem",
    destination: "Alger, El Harrach",
  ),
  Schedule(
    numero: 78,
    type: "Bus",
    nextArrival: "Today",
    time: "17:00",
    departure: "Alger, El Harrach",
    destination: "Alger, Ain Taya",
  ),
];
