function repList() {
    if (Object.keys(Rep).length > 2) {
        var obj = sortObject(Rep);
        delete obj.BanList;
        delete obj.rll;
        for (var i = 0; i < Object.keys(obj).length; i++) {
            var ID = Object.keys(obj)[i];
            obj[ID] = prs(obj[ID]);
            if (GetUsername(ID) !== null) {
                obj[ID]["Name"] = GetUsername(ID);
            } else {
                delete Rep[ID];
                delete obj[ID];
            };
        };
        var arr = [];
        var Names = [];
        var emb = {};
        var Colors = ["FFC800", "FF0F7F", "FF0F1A", "2EF65C", "F5F404", "DA1E8", "FFA200", "D96AF2"];
        var RandColor = Colors[(Math.floor(Math.random() * Colors.length) + 1)];
        emb.color = HTML2Int(RandColor);
        emb.description = "";
        for (var i = 0; i < Object.keys(obj).length; i++) {
            var ID = Object.keys(obj)[i];
            arr.push(obj[ID]);
        }
        var byAmount = arr.slice(0);
        byAmount.sort(function(a,b) {
            return b.Amount - a.Amount;
        });
        var lb = 0;
        if (Rep.hasOwnProperty("rll")) {
            if (rep.rll === "Everybody") {
                lb = Object.keys(obj).length;
            } else if (Object.keys(obj).length < JSON.parse(rep.rll)) {
                lb = Object.keys(obj).length;
            } else {
                lb = JSON.parse(rep.rll);
                emb.title = "Showing *Top " + lb +"*:";
            }
        } else {
            lb = Object.keys(obj).length;
        }
        var ct = 1;
        var ctn = 0;
        for (var i = 0; i < lb; i++) {
            if (ChannelID !== "283124279044866048") {
                if (byAmount[i]["Amount"] > 0) {
                    if (i > 0) {
                        if (byAmount[i]["Amount"] === byAmount[(i - 1)]["Amount"]) {
                            emb.description += "**" + ct + ".** " + byAmount[i]["Name"] + ": *" + byAmount[i]["Amount"] + "*\n";
                        } else {
                            emb.description += "**" + (ct + 1) + ".** " + byAmount[i]["Name"] + ": *" + byAmount[i]["Amount"] + "*\n";
                            ct++;
                        }
                    } else {
                        emb.description += "**" + ct + ".** " + byAmount[i]["Name"] + ": *" + byAmount[i]["Amount"] + "*\n";
                    }
                } else {
                    ctn++;
                }
            } else {
                if (i > 0) {
                    if (byAmount[i]["Amount"] === byAmount[(i - 1)]["Amount"]) {
                        emb.description += "**" + ct + ".** " + byAmount[i]["Name"] + ": *" + byAmount[i]["Amount"] + "*\n";
                    } else {
                        emb.description += "**" + (ct + 1) + ".** " + byAmount[i]["Name"] + ": *" + byAmount[i]["Amount"] + "*\n";
                        ct++;
                    }
                } else {
                    emb.description += "**" + ct + ".** " + byAmount[i]["Name"] + ": *" + byAmount[i]["Amount"] + "*\n";
                }
            }
        }
        if (emb.description.length > 0) {
            if (ctn > 0) {
                if (emb.description.length > 0) {
                    emb.description += "\n*People with 0 or a negative amount of reputation points are not shown.*"
                }
            }
            return emb;
        } else {
            var msg = "I couldn't find any users yet in the database."
            return msg;
        }
    } else {
        var msg = "I couldn't find any users yet in the database."
        return msg;
    }
}