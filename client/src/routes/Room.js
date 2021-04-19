import React, { useRef, useEffect } from "react";
import io from "socket.io-client";
import "../CSS/Room.css";
import screen from "../assets/screen.png";
import mute from "../assets/mute.png";
import camera from "../assets/video-camera.png";
import endcall from "../assets/endcall.png";

const Room = (props) => {
  const userVideo = useRef();
  const partnerVideo = useRef();
  const peerRef = useRef();
  const socketRef = useRef();
  const otherUser = useRef();
  const userStream = useRef();
  const senders = useRef([]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        userStream.current = stream;

        socketRef.current = io.connect("/");
        console.log("started");
        socketRef.current.emit("join room", props.match.params.roomID);
        dragElement();

        socketRef.current.on("other user", (userID) => {
          console.log("other user " + userID);
          callUser(userID);
          otherUser.current = userID;
        });

        socketRef.current.on("no user", (userID) => {
          console.log(userID);
        });

        socketRef.current.on("user joined", (userID) => {
          console.log("user joined");
          otherUser.current = userID;
        });

        socketRef.current.on("offer", handleRecieveCall);

        socketRef.current.on("answer", handleAnswer);

        socketRef.current.on("ice-candidate", handleNewICECandidateMsg);
      });
  }, [callUser, handleRecieveCall, dragElement]);

  function callUser(userID) {
    peerRef.current = createPeer(userID);
    userStream.current
      .getTracks()
      .forEach(track => senders.current.push(peerRef.current.addTrack(track, userStream.current)));
  }

  function createPeer(userID) {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
        {
          urls: "turn:numb.viagenie.ca",
          credential: "muazkh",
          username: "webrtc@live.com",
        },
      ],
    });

    peer.onicecandidate = handleICECandidateEvent;
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

    console.log(peer);
    return peer;
  }

  function handleNegotiationNeededEvent(userID) {
    peerRef.current
      .createOffer()
      .then((offer) => {
        return peerRef.current.setLocalDescription(offer);
      })
      .then(() => {
        const payload = {
          target: userID,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription,
        };
        socketRef.current.emit("offer", payload);
      })
      .catch((e) => console.log(e));
  }

  function handleRecieveCall(incoming) {
    peerRef.current = createPeer();
    const desc = new RTCSessionDescription(incoming.sdp);
    peerRef.current
      .setRemoteDescription(desc)
      .then(() => {
        userStream.current
          .getTracks()
          .forEach((track) =>
            peerRef.current.addTrack(track, userStream.current)
          );
      })
      .then(() => {
        return peerRef.current.createAnswer();
      })
      .then((answer) => {
        return peerRef.current.setLocalDescription(answer);
      })
      .then(() => {
        const payload = {
          target: incoming.caller,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription,
        };
        socketRef.current.emit("answer", payload);
      });
  }

  function handleAnswer(message) {
    const desc = new RTCSessionDescription(message.sdp);
    peerRef.current.setRemoteDescription(desc).catch((e) => console.log(e));
  }

  function handleICECandidateEvent(e) {
    if (e.candidate) {
      const payload = {
        target: otherUser.current,
        candidate: e.candidate,
      };
      socketRef.current.emit("ice-candidate", payload);
    }
  }

  function handleNewICECandidateMsg(incoming) {
    const candidate = new RTCIceCandidate(incoming);

    peerRef.current.addIceCandidate(candidate).catch((e) => console.log(e));
  }

  function handleTrackEvent(e) {
    partnerVideo.current.srcObject = e.streams[0];
  }

  function shareScreen() {
    navigator.mediaDevices.getDisplayMedia({ cursor: true }).then(stream => {
        const screenTrack = stream.getTracks()[0];
        console.log(screenTrack);
        
        senders.current.find(sender => sender.track.kind === 'video').replaceTrack(screenTrack);
        screenTrack.onended = function() {
            senders.current.find(sender => sender.track.kind === "video").replaceTrack(userStream.current.getTracks()[1]);
        }
    })
}

  /*---------------Make small camera movable----------------*/

    function dragElement() {
    var  elmnt = document.getElementById("myVideo");
    console.log(elmnt);
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    if (elmnt) {
      elmnt.onmousedown = dragMouseDown;
    }
    // }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  return (
    <div className="room-container">
      <div className="video-container">
        <video
          id="partnerVideo"
          className="imageDiv topDiv "
          autoPlay
          controls
          ref={partnerVideo}
        />
        <video
          id="myVideo"
          className="imageDiv bottomDiv"
          muted="muted"
          autoPlay
          controls
          ref={userVideo}
        />
        <div className="room-buttons">
          <img
            className="LogoRoom camera"
            src={camera}
            alt="logo"
            height="50"
            width="50"
          />
          <img
            className="LogoRoom mute"
            src={mute}
            alt="logo"
            height="50"
            width="50"
          />
          <img
            className="LogoRoom screen"
            src={screen}
            onClick={shareScreen}
            alt="logo"
            height="50"
            width="50"
          />
          <img
            className="LogoRoom end"
            src={endcall}
            onClick={endcall}
            alt="logo"
            height="50"
            width="50"
          />



        </div>
      </div>

      <div id="chat">
        <header>
          {/* <h1>⚛️🔥💬</h1> */}
          <h1>Chat Room</h1>
          {/* <SignOut /> */}
        </header>

        <section>{<ChatRoom />}</section>
      </div>
      <div className="room-bottom">hello</div>
    </div>
  );
};

// function SignOut() {
//   return (
//     auth.currentUser && (
//       <button className="sign-out" onClick={() => auth.signOut()}>
//         Sign Out
//       </button>
//     )
//   );
// }

function ChatRoom() {
  //   const dummy = useRef();
  //   const messagesRef = firestore.collection("messages");
  //   const query = messagesRef.orderBy("createdAt").limit(25);

  //   const [messages] = useCollectionData(query, { idField: "id" });

  //   const [formValue, setFormValue] = useState("");

  //   const sendMessage = async (e) => {
  //     e.preventDefault();

  //     const { uid, photoURL } = auth.currentUser;

  //     await messagesRef.add({
  //       text: formValue,
  //       createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //       uid,
  //       photoURL,
  //     });

  //     setFormValue("");
  //     dummy.current.scrollIntoView({ behavior: "smooth" });
  //   };

  return (
    <>
      <main>
        <ChatMessage key={3} message={"Hello Johnny!"} />
        <ChatMessage key={8} message={"The meeting will start in 5 minutes."} />

        {/* <span ref={dummy}></span> */}
      </main>

      <form>
        <input
          type="text"
          //   value={formValue}
          //   onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type your message here"
        />

        <button type="submit">📝</button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  //   const { text, uid, photoURL } = props.message;

  //   const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div>
        <img
          src={
            "https://p.kindpng.com/picc/s/24-248325_profile-picture-circle-png-transparent-png.png"
          }
        />
        <p>{props.message}</p>
      </div>
    </>
  );
}
export default Room;
