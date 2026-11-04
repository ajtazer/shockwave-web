// Shockwave game loader for dirplayer. Usage:
//   <script src="shockwave.js" data-dir="content/<original host>/<original path>/"
//     data-launch='"{dir}wrapper.dcr" --do "member(&apos;gameUrl&apos;).text = &apos;{dir}game.dcr&apos;"'
//     data-width="800" data-height="600"></script>
// data-launch is the game's Flashpoint launch command; {dir} becomes the absolute URL of data-dir.
// The player is loaded from dirplayer/ next to this file.
const s = document.currentScript;
const dir = new URL(s.dataset.dir, location.href).href;
const command = s.dataset.launch.replaceAll("{dir}", dir);
const playerUrl = new URL("dirplayer/dirplayer-polyfill.js", s.src).href;

document.head.insertAdjacentHTML("beforeend",
  "<style>html,body{margin:0;background:#000}body{display:flex;align-items:center;justify-content:center;min-height:100vh}</style>");

addEventListener("DOMContentLoaded", () => {
  const host = document.createElement("div");
  host.dataset.launchCommand = command; // dirplayer reads the launch command from this attribute
  const embed = document.createElement("embed");
  embed.src = command.match(/^"([^"]+)"/)[1];
  embed.width = s.dataset.width || 800;
  embed.height = s.dataset.height || 600;
  embed.type = "application/x-director";
  host.append(embed);
  document.body.append(host);

  const player = document.createElement("script");
  player.src = playerUrl;
  player.dataset.manualInit = "";
  player.onload = () => {
    // Flash menus that never answer dirplayer's ActionScript probe would otherwise wait 3 s each.
    DirPlayer.configureFlash({ asInitWaitMs: 0 });
    DirPlayer.init();
  };
  document.body.append(player);
});
