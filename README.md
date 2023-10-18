# CoralStats

![GitHub](https://img.shields.io/github/license/gigantino/coralstats)

[CoralStats](https://coralstats.com) is an unofficial website to track the stats of all [CoralMC](https://coralmc.it)'s players.

## Roadmap

- [ ] KitPvp Stats
- [ ] Leaderboards
- [x] Search autocompletion (Algolia)

## API

This repository uses https://api.coralstats.com/ under the hood instead of CoralMC's new (alpha) API. That's because, at the current state, CoralMC's API:

- Doesn't return some stats (e.g. beds broken).
- Doesn't return the actual skins.
- Could stop working at any point.
- Doesn't keep track of stats (which is potentially never going to be implemented)
  https://api.coralstats.com isn't open-source, but it's _very_ permissive and doesn't require a token. One the official API gets more stable, I'm going to make the switch.

## Contributing

Contributions aren't accepted as of right now. If you want to send feedback or request a feature, you can join the [Discord server](https://discord.gg/afE7trvbYj).

## License

This project is licensed under the GNU General Public License v3.0 - see [LICENSE](LICENSE) for details.
