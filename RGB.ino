#include <FirebaseESP8266.h>
#include <ESP8266WiFi.h>

#define WIFI_SSID "HCMUS Thu Vien"
#define WIFI_PASSWORD "123456789"

#define FIREBASE_HOST "curtain-controller-7ebbd-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "sKYzciKT380FrwEJ3qw24oqcEIVXQxPEpMuPdPn9"
FirebaseData firebaseData;
String automode = "";
String action = "";
String temp="";
const int r_pin = 0;
const int g_pin = 4;
const int b_pin = 5;
const int LDR_pin = A0;
int delay_time = 2500;
int curtain_state = 0 ;// 0 là đang đóng, 1 là đang mở.


void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  Serial.begin(9600);
  pinMode(r_pin, OUTPUT);
  pinMode(g_pin, OUTPUT);
  pinMode(b_pin, OUTPUT);
  pinMode(LDR_pin, INPUT);

  //connect to WIFI
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ") ;
  Serial.println(WiFi.localIP());
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

}
void led_R() {
  digitalWrite(r_pin, HIGH);
  digitalWrite(g_pin, LOW);
  digitalWrite(b_pin, LOW);
  delay(delay_time);
}

void led_G() {
  digitalWrite(r_pin, LOW);
  digitalWrite(g_pin, HIGH);
  digitalWrite(b_pin, LOW);
  delay(delay_time);
}
void led_B() {
  digitalWrite(r_pin, LOW);
  digitalWrite(g_pin, LOW);
  digitalWrite(b_pin, HIGH);
  delay(delay_time);
}
void NaN()
{
  digitalWrite(r_pin, LOW);
  digitalWrite(g_pin, LOW);
  digitalWrite(b_pin, LOW);
}
void print_A0_value()
{
  int a0_value = analogRead(LDR_pin);
  Serial.println(a0_value);
  delay(1000);
}
// the loop function runs over and over again forever
void loop()
{
  // get data from database
  Firebase.getString(firebaseData, "/autoMode");
  automode = firebaseData.stringData();
  Firebase.getString(firebaseData, "/action");
  action = firebaseData.stringData();
  
  Serial.println("check: ");
  Serial.println(automode);
  Serial.println(action);
  if (automode.toInt() == 1) {
    int a0_value = analogRead(LDR_pin);
    Serial.println(a0_value);
    if (a0_value < 1000 )
    {
      if (curtain_state == 0)
      {
        led_B();
        curtain_state = 1;
        delay(delay_time); //Thời gian để mở rèm là 10s.
        led_G();
      }
    }
    else if (a0_value >= 1000 )
    {
      if (curtain_state == 1)
      {
        led_B();
        curtain_state = 0;
        delay(delay_time); //Thời gian để đóng rèm là 10s.
        led_R();
      }
    }
 
  }
  else {
    if (action.toInt() == 0) {
      if (curtain_state == 0)
      {
        led_B();
        curtain_state = 1;
        delay(delay_time); //Thời gian để mở rèm là 10s.
        led_G();
      }
    }
    else {
      if (curtain_state == 1)
      {
        led_B();
        curtain_state = 0;
        delay(delay_time); //Thời gian để mở rèm là 10s.
        led_R();
      }
    }
    
  }
//  led_B();
}
