import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div class="container text-center">
          <h1
            class="display-4"
            style="text-shadow: 2px 2px 5px gray; font-weight:bold;"
          >
            WMX Tablet Download
          </h1>
          <div class="flex-column">
            <div class="row">
              <div class="col-sm-5 col-md-6 col-lg-4">
                <img
                  class="center-fit"
                  // src="~/images/WMX Tablet.png"
                
                  alt="Download WMX Tablet"
                />
                <div class="align-self-center">
                  <h1 style="color:black; text-size-adjust: 80%; font-weight:normal;">
                    WMX Tablet{" "}
                  </h1>
                </div>
                <div class="align-self-center">
                  <h6 style="color:black; text-size-adjust: 50%;">
                    Version 3.0.0.38
                  </h6>
                </div>
              </div>
              <div class="col-sm-5 col-md-4 col-lg-2 align-self-center">
                <a href="~/Tablet/APK/WMX/WMX.apk">
                  <img
                    class="center-Download"
                    // src="~/images/Tablet Download.png"
                   
                    alt="Download WMX Tablet"
                  />
                </a>
              </div>
              <div class="col-sm-5 col-md-6 col-lg-4">
                <img
                  class="center-GSC"
                  // src="~/images/WMX HH.png"
                 
                  alt="Download WMX Tablet"
                />
                <div class="align-self-center">
                  <h1 style="color:black; text-size-adjust: 80%; font-weight:normal;">
                    WMX For GSC{" "}
                  </h1>
                </div>
                <div class="align-self-center">
                  <h6 style="color:black; text-size-adjust: 50%;">
                    Version 3.0.0.13
                  </h6>
                </div>
              </div>
              <div class="col-sm-5 col-md-4 col-lg-2 align-self-center">
                <a href="~/Tablet/APK/WMX/WMX-GSC.apk">
                  <img
                    class="center-Download"
                    // src="~/images/GSC Downlaod.png"
                   
                    alt="Download WMX Tablet"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
