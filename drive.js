AFRAME.registerComponent("drive", {
    init:function(){
        var gameStateValue = this.el.getAttribute("game")
        if(gameStateValue === "play"){
            this.driveCar()
        }
    },
    driveCar:function(){
        var multiply = 10
        var wheelRotation = 0

        //Key down events
        window.addEventListener("keydown", (e)=>{
            //Steering wheel rotation on <-- or --> arrows
            var wheel = document.querySelector("#steering")
            if (e.code == "ArrowRight" && wheelRotation > -40){
                wheelRotation -= 5
                wheel.setAttribute("rotation", {x:0, y:0, z:wheelRotation})
            }
            if (e.code == "ArrowLeft" && wheelRotation < 40){
                wheelRotation += 5
                wheel.setAttribute("rotation", {x:0, y:0, z:wheelRotation})
            }
        //Camera movement controls- Rotation/direction at <-- or --> arrow
        var cameraRig = document.querySelector("#camera-rig")
        var cameraRotation = cameraRig.getAttribute("rotation")
        var cameraPosition = cameraRig.getAttribute("position")
        var cameraMovementControls = cameraRig.getAttribute("movement-controls")
        
        cameraRig.setAttribute("movement-controls", {"speed":cameraMovementControls.speed+0.005})
        var cameraDirection = new THREE.Vector3()
        cameraRig.Object3D.getWorldDirection(cameraDirection)

        if(e.code == "ArrowRight"){
            cameraRotation.y -= 5
            cameraRig.setAttribute("rotation", {x:0,y:cameraRotation.y,z:0})
            cameraRig.setAttribute("movement-controls", {"speed":cameraMovementControls.speed+0.005})

        }
        if(e.code == "ArrowLeft"){
            cameraRotation.y += 5
            cameraRig.setAttribute("rotation", {x:0,y:cameraRotation.y,z:0})
            cameraRig.setAttribute("movement-controls", {"speed":cameraMovementControls.speed+0.005})

        }
        //Accelerate on ^ arrow
        if(e.code == "ArrowUp"){
            multiply += 0.5
            if(multiply <= 100 && cameraPosition.z > -500){
                cameraRig.setAttribute("movement-controls", {"speed":cameraMovementControls.speed+0.005})
                var accelerateCar = document.querySelector("#accelerator") 
                accelerateCar.setAttribute("material", "color", "green")
                var carSpeed = document.querySelector("#speed")
                carSpeed.setAttribute("text", {value:multiply})
            }
        }
        //Decelerate/stop at Space key
        if(e.code == "Space"){
            cameraRig.setAttribute("movement-controls", {"speed":0})
            var stopCar = document.querySelector("#brake")
            stopCar.setAttribute("material", "color", "red")
        }
        })

        //Key up events
        window.addEventListener("keyup", (e)=>{
            var cameraRig = document.querySelector("#camera-rig")
            var cameraDirection = new THREE.Vector3()
            cameraRig.Object3D.getWorldDirection(cameraDirection)
            var cameraMovementControls = cameraRig.getAttribute("movement-controls")
            //Space key
            if (e.code == "Space") {
                var startCar = document.querySelector("#brake")
                startCar.setAttribute("material", "color", "gray")
            }
            //Up Arrow
            if(e.code == "ArrowUp"){
                if(multiply > 10){
                    multiply -= 0.5
                    cameraRig.setAttribute("movement-controls", {"speed":cameraMovementControls+0.005})
                }
             var accelerateCar = document.querySelector("#accelerator") 
             accelerateCar.setAttribute("material", "color", "gray")
            }

        })
    }
})