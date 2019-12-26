function canvasPrint() {
	c = document.getElementById("myCanvas");
	ctx = c.getContext("2d");

	// Complex gradient with alpha interpolation
	// Precise floats to test rounding mechanisms too
	g = ctx.createLinearGradient(-0.64562,0.48641,300.4785,50.41556);
	g.addColorStop(0.13636754,"#FD99CD5E");
	g.addColorStop(0.37574775,"#69DF36A2");
	g.addColorStop(0.82737264,"#0268DE4E");
	ctx.fillStyle = g;
	ctx.fillRect(0.34896,0.4515641,300.15555,50.4484);

	// Draw an orange box and try color it with an unknown color
	ctx.fillStyle = "#f60";
	ctx.fillStyle = "fingerprint";
	ctx.fillRect(115,15,60,20);

	// High entropy string to be drawn twice with differing transparencys
	txt = "FingerPrint !!<canv😈s>??";
	ctx.textBaseline = "top";
	ctx.font = "26px 'Arial'";
	ctx.textBaseline = "alphabetic";
	ctx.fillStyle = "#069E";
	ctx.fillText(txt, 4, 33);

	// Second time, scale and rotate the text before drawing
	ctx.scale(1.0004894,0.99984654);
	ctx.rotate(0.020008408);
	ctx.fillStyle = "#2E0D"
	ctx.fillText(txt, 6, 35);

	// Scale and rotate the canvas again, then we'll draw a
	// high entropy arc without specifying stroke or thickness
	ctx.scale(1.18674864,0.99753682);
	ctx.rotate(Math.PI * 0.3333355564333333);
	ctx.beginPath();
	ctx.arc(75.048948,0,50,0.255151,Math.PI*Math.E*0.4624*1.1856484);
	ctx.stroke();
	ctx.fillStyle = "black";
	ctx.strokeStyle = "yellow";
	ctx.lineWidth=2.45841;
	ctx.moveTo(3.578,7.1185);
	ctx.lineTo(0.2945,20.8778);
	ctx.stroke();

	// Another gradient for good measure
	ctx.fillStyle = g;
	ctx.fillRect(-200,-50,300.15555,50.4484);

	// s = c.toDataURL("image/png");
	s = c.toDataURL("image/png") || "Blocked";
	if (s == "Blocked") return "Blocked";
	const hashCode = s => s.split('').reduce((a,b) => (((a << 5) - a) + b.charCodeAt(0))|0, 0);
	return hashCode(s);
}