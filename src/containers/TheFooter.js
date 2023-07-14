import React from "react";
import { CFooter } from "@coreui/react";
import SystemInfo from "../../src/helpers/SystemInfo";

const TheFooter = () => {
  return (
    <CFooter className="headtext" fixed={false}>
      {/* <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer"></a>
        <span className="ml-1">Version : {SystemInfo.systemVersion}</span>
      </div> */}
      <div className="mfs-auto">
        <span className="ml-1">Version :</span>
        <span className="ml-1" color={"Primary"}>
          {" "}
          {SystemInfo.systemVersion}
        </span>
        <span>
          {/* Begin SCG Cookie & Policy Notice */}
          <link
            rel="stylesheet"
            type="text/css"
            href="https://stpdpaprivacineprdsea001.blob.core.windows.net/scgchemicals/WOEx ATS/b86f714f14da421493039e8dcd4c4128.css"
          />
          {/* End SCG Cookie & Policy Notice */}
        </span>
        <span defaultValue={document.getElementById("footerid")}></span>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
