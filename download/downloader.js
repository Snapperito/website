window.DownloadApi = {
	converter: {
		darkdiscord: _ => `https://raw.githubusercontent.com/snappercord/dark-discord/master/BetterDiscord/darkdiscord.theme.css`,
		snapperfault: _ => `https://github.com/Snapperito/info/raw/main/snapperfault.zip`,
	},
	convert: (parameterString, error) => {
		if (typeof parameterString == "string") for (let parameter in window.DownloadApi.converter) {
			let arg = (parameterString.split(`?${parameter}=`)[1] || "").split("?")[0] || "";
			if (arg) {
				window.DownloadApi.download(window.DownloadApi.converter[parameter](arg), error);
				break;
			}
			else if (parameterString.endsWith(`?${parameter}`)) {
				window.DownloadApi.download(window.DownloadApi.converter[parameter](), error);
				break;
			}
		}
	},
	download: (url, error) => {
		if (!url) return error && error("No URL!");
		const xhttp = new XMLHttpRequest();
		xhttp.onload = function() {
			if (this.status == 200) {
				const tempLink = document.createElement("a");
				tempLink.href = window.URL.createObjectURL(new Blob([this.response], {type: `text/${url.split(".").pop()}`}));
				tempLink.download = url.split("/").pop();
				tempLink.click();
			}
			if (this.status == 404) error && error(`GitHub File <a href"${url}">${url}</a> does not exist!`);
		};
		xhttp.onerror = function() {error && error(`GitHub File <a href="${url}">${url}</a> does not exist!`);};
		xhttp.open("GET", url, true);
		xhttp.send();
	}
};
