function setTotalViewers(total)
{
    $("#total_viewers").html(total);
}

function setUpTime(time)
{
    $("#uptime").html(time);
}

function setBandwidthInPerSec(bytes)
{
    $("#bandwidth_in_per_sec").html(bytes);
}

function setBandwidthOutPerSec(bytes)
{
    $("#bandwidth_out_per_sec").html(bytes);
}

function setTotalBandwidthIn(bytes)
{
    $("#total_bandwidth_in").html(bytes);
}

function setTotalBandwidthOut(bytes)
{
    $("#total_bandwidth_out").html(bytes);
}

function setTotalRequest(request)
{
    $("#total_request").html(request);
}

function setCpuUse(percent)
{
    $("#cpu_used").html(percent);
}

function setRamUse(bytes)
{
    $("#memory_used").html(bytes);
}

function setLiveStream(data)
{

    var table = "";
    var language_play = $("#language_play").val();
    var language_drop = $("#language_drop").val();
    var exids = "";
    $.each(data, function (index,channel) {

	var hls = 0;
        var rtmp = 0;
        if (channel.nclients[0] > 0) {
            hls = 1;
            rtmp = channel.nclients[0] - hls;
        }
	var decode_token = Base64.decode(channel.name[0]);
        var camera_name = decode_token.split("|")[1];
	if (index == 0) {
		exids = decode_token.split("|")[0];
	} else {
		exids = exids + "," + decode_token.split("|")[0];
	}
        var name = "<td class='text-center'style='overflow: hidden;position: relative;white-space: nowrap;box-sizing:border-box;display:block;max-width:150px;'>"+camera_name+"</td>";
        var bw_in = "<td class='text-center'>"+byteToHuman(channel.bw_in[0])+"</td>";
        var bw_out = "<td class='text-center'>"+byteToHuman(channel.bw_out[0])+"</td>";
        var bytes_in = "<td class='text-center'>"+byteToHuman(channel.bytes_in[0])+"</td>";
        var bytes_out = "<td class='text-center'>"+byteToHuman(channel.bytes_out[0])+"</td>";
        var time  = "<td class='text-center'>"+secondsToHuman(channel.time[0] / 1000)+"</td>";
        var viewers_rtmp = "<td class='text-center'><b>"+numeral(rtmp).format('0,0')+"<b/></td>";
	var viewers_hls = "<td class='text-center'><b>"+numeral(hls).format('0,0')+"<b/></td>";
	var v_w = 0;
	var v_h = 0;
	if (typeof channel.meta !== 'undefined') {
	    v_w = channel.meta[0].video[0].width[0];
	    v_h = channel.meta[0].video[0].height[0];
	}
        var resolution = "<td class='text-center'>"+ v_w + " X " + v_h+"</td>";
        var play = "<td><button class='btn btn-default play_stream' data-stream-name='"+channel.name[0]+"' data-toggle='modal' data-target='#stream_popup'><i class='glyphicon glyphicon-play'></i> "+language_play+"</button></td>";
	    var drop = "<td><button class='btn btn-default drop_stream' data-stream-name='"+channel.name[0]+"'><i class='glyphicon glyphicon-stop'></i> "+language_drop+"</button></td>";
        table = table + "<tr>"+name+resolution+bw_in+bw_out+bytes_in+bytes_out+viewers_rtmp+viewers_hls+time+drop+"</tr>";

    });

    $("#camera_exids").val(exids);
    $("#live_stream").html(table);

    playStreamEvent();
    dropStreamEvent();
}
