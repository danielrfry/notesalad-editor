# Note Salad Editor

A browser-based GUI patch editor and software synthesizer based on [Note Salad](https://github.com/danielrfry/notesalad)'s MIDI implementation, supporting the Yamaha OPL, OPM and SD-1 FM synthesizer chips.

Note Salad Editor includes OPL and OPM emulators from [ymfm](https://github.com/aaronsgiles/ymfm/), allowing it to be used as a standalone software synthesizer. In browsers supporting Web MIDI, it can also drive external hardware synthesizers that embed Note Salad, and accept input from hardware MIDI controllers (or software loopback devices).

**Try it out here:** https://danielrfry.github.io/notesalad-editor/

## Building and running locally

First, clone and build [Note Salad](https://github.com/danielrfry/notesalad), following the instructions under _Building libnotesalad for web_. Once built, link it with the following commands in the **Note Salad** repository:

```
cd web
npm link
```

Next, in the **Note Salad Editor** repository:

```
npm install
npm link notesalad
```

Start the development server:

```
npm run start
```

To create a production build suitable for deployment:

```
npm run build
```

The build output is placed in the `build` subdirectory.

## Using with sequencers

In order to use Note Salad Editor as a software synthesizer in conjunction with a sequencer, a MIDI loopback driver is required to route MIDI output from the sequencer to the MIDI input of Note Salad Editor.

On Linux, the _Midi Through Ports_ provided by the `snd-seq-dummy` driver can be used for this purpose. This driver is loaded by default on Ubuntu.

On macOS, the [IAC driver](https://support.apple.com/guide/audio-midi-setup/ams1013/mac) can be used to create a loopback MIDI port.

On Windows, [loopMIDI](https://www.tobias-erichsen.de/software/loopmidi.html) appears to be a well-known solution (though please note that I have not tested this personally).
