import React, { useState, useEffect } from "react";
import { CometChat } from "@cometchat-pro/chat";
import { CometChatUI } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src";
const Chat = () => {
  chatLogin();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      chatLogin();
    }
  }, []);

  function chatLogin() {
    const appID = "242435259ac8a12c";
    const region = "US";
    const authKey = "310e279501ee4e4f574e4d6c4093132a60a1570b";
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .build();
    CometChat.init(appID, appSetting).then(
      () => {
        console.log("Initialization completed successfully");
        // You can now proceed with rendering your app or calling the login function.
        // var uid = "user1";
        // var name = "Kevin";
        var uid = localStorage.getItem("user_id");
        var name = localStorage.getItem("user_userName");
        CometChat.login(uid, authKey).then(
          (user) => {
            console.log("Login Successful:", { user });
          },
          (error) => {
            console.log("Login failed with exception:", { error });
          }
        );
      },
      (error) => {
        console.log("Initialization failed with error:", error);
        // Check the reason for error and take appropriate action.
      }
    );
  }
  //   const appID = "242435259ac8a12c";
  //   const region = "US";
  //   const authKey = "310e279501ee4e4f574e4d6c4093132a60a1570b";
  //   const appSetting = new CometChat.AppSettingsBuilder()
  //     .subscribePresenceForAllUsers()
  //     .setRegion(region)
  //     .build();
  //   CometChat.init(appID, appSetting).then(
  //     () => {
  //       console.log("Initialization completed successfully");
  //       // You can now proceed with rendering your app or calling the login function.
  //       // var uid = "user1";
  //       // var name = "Kevin";
  //       var uid = localStorage.getItem("user_id");
  //       var name = localStorage.getItem("user_userName");
  //       // var user = new CometChat.User(uid);
  //       // user.setName(name);
  //       // CometChat.createUser(user, authKey).then(
  //       //     user => {
  //       //         console.log("user created", user);
  //       //     },error => {
  //       //         console.log("error", error);
  //       //     }
  //       // )
  //       CometChat.login(uid, authKey).then(
  //         (user) => {
  //           console.log("Login Successful:", { user });
  //         },
  //         (error) => {
  //           console.log("Login failed with exception:", { error });
  //         }
  //       );
  //     },
  //     (error) => {
  //       console.log("Initialization failed with error:", error);
  //       // Check the reason for error and take appropriate action.
  //     }
  //   );
  return (
    <div style={{ width: "100%", height: "800px" }}>
      <CometChatUI />
    </div>
  );
};

export default Chat;
