scriptId = "Hackathon"
appTitle = ""
Ystart = 0
Ymeasure=0
deltaY = 0
status=1
x=0
y=0
z=0

function onForegroundWindowChange(app, title)
	if (title == "Hackathon") then
		appTitle = title
		Ystart = myo.getPitch()
		myo.debug(Ystart)
	    myo.unlock("hold")
        myo.notifyUserAction()
	end 
	return true
end

function leftDrum()
	myo.keyboard("f","press")
end

function rightDrum()
	myo.keyboard("j","press")
end

function start()
	myo.vibrate("short")
end

function onPeriodic()
	local Ymeasure = myo.getPitch()
	local x, y, z = myo.getGyro()
	if ((y<0.2)and(y>-0.2)) then
		y=0
	end
	deltaY = Ymeasure - Ystart
	if (status== 1) then
		if deltaY > 0.05 then 
			if (myo.getArm()=="left") then
				leftDrum()   
				status= -1
			elseif(myo.getArm()=="right") then
				rightDrum()
				status = -1
			end
		end
	elseif(status== -1) then	
		if deltaY < -0.05 then
			status = 1
		end
	end	
end

function onPoseEdge(pose,edge)
	if edge =="on" then
		if (pose=="fist") then
			myo.keyboard("space","press")
		elseif (pose=="waveOutff") then
			rightDrum()
		elseif(pose=="waveIn") then
			leftDrum()
		elseif(pose=="doubleTap") then
			leftDrum()
			rightDrum()
		end
	end
	if edge == "off" then
        myo.unlock("hold")
        myo.notifyUserAction()
    end
end



