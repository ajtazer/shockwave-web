# dirplayer build used by play.bihari.xyz

A build of [dirplayer-rs](https://github.com/igorlira/dirplayer-rs), the Shockwave emulator, licensed GPL-3.0 (see `LICENSE`).

**Source:** dirplayer-rs PR #244 at commit `b9b9466` (`git fetch origin pull/244/head`), with `dirplayer-rs.patch` applied. The patch contains:

- the fixes from [sewerrun-browser-port](https://github.com/Suleiman700/sewerrun-browser-port) (Havok placement in Y-up scenes, `#loopCount` on sounds, a faster W3D mesh decoder, the `asInitWaitMs` Flash option)
- `_movie.systemDate()`, the dot-syntax form of `the systemDate`, which Metal Mayhem 2 and World Tour call at startup

**Rebuild:**

```sh
git clone https://github.com/igorlira/dirplayer-rs && cd dirplayer-rs
git fetch origin pull/244/head:pr244 && git checkout b9b9466
git apply /path/to/dirplayer-rs.patch
npm ci --ignore-scripts
(cd vm-rust && wasm-pack build --target web --no-opt)
npx vite build -c vite.config.polyfill.js   # -> dist-polyfill/dirplayer-polyfill.js
```

`ruffle/` is the Ruffle build from the official dirplayer-rs v0.8.1 release. Its submodule commit is the same in v0.8.1 and PR #244.
