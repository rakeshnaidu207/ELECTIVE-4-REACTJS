function instrumentClick(instr) {
    switch (instr) {
      case "crash":
        var crash = new Audio("sounds/crash.mp3");
        crash.play();
        break;
      case "kick":
        var kick = new Audio("sounds/kick.mp3");
        kick.play();
        break;
      case "snare":
        var snare = new Audio("sounds/snare.mp3");
        snare.play();
        break;

      case "tom":
        var tom1 = new Audio("sounds/tom.mp3");
        tom1.play();
        break;
    }
  }