# Hermes Setup for This Demo

We are using Hermes `v1.6.0` for this demo. You can follow the [Hermes installation guide](https://hermes.informal.systems/quick-start/installation.html) to install Hermes.

## Hermes Configuration

This ignite demo uses two chains to demonstrate incentivized cross-chain transfers. The first chain is called `earth` and the second chain is called `mars`. Their ignite config files are located in the root of the repository, called `earth.yml` and `mars.yml` respectively. To launch these chains run the following commands respectively.

```bash
ignite chain serve -c earth.yml --reset-once
```

```bash
ignite chain serve -c mars.yml --reset-once
```

The configuration file for hermes to run between the two chains is located in this directory called `config.toml`. To run hermes with this configuration file you can use the `--config` flag or move the file to the default location of `~/.hermes/config.toml`.

```bash
cp config.toml ~/.hermes/config.toml
```

## Hermes Keys

Hermes uses keys to sign transactions and messages. The keys for this demo are located in this directory called `charlie.mnemonic` and `damian.mnemonic`. To import these keys into hermes you can use

```bash
hermes keys add --key-name charlie --chain earth --mnemonic-file charlie.mnemonic
```

```bash
hermes keys add --key-name damian --chain mars --mnemonic-file damian.mnemonic
```

These wallets are funded automatically with tokens on both chains due to `earth.yml` and `mars.yml` configuration files.

## Run Hermes

### Create an Incentivized Transfer Channel

To create an incentivized transfer channel between the two chains you can use the following command.

```bash
hermes create channel --channel-version '{"fee_version":"ics29-1","app_version":"ics20-1"}' --a-chain earth --b-chain mars --a-port transfer --b-port transfer --new-client-connection --yes
```

### Start Relayer

To start the relayer you can use the following command.

```bash
hermes start
```

And to stop the relayer, you can use `ctrl+c`.

### Register Counterparty Payee

The fee middleware requires that all fees are settled in the source chain. This means that if you are sending tokens from `earth` to `mars` then the fee must be paid in `earth` native tokens to an `earth` wallet. To do this, we need to register the counterparty payee on the `earth` chain for the releyer in `mars` chain.

```bash
hermes fee register-counterparty-payee --chain mars --channel channel-0 --port transfer --counterparty-payee cosmos1vapwvcsr0m32ptal6z6g9hjctywrw4yzyf6y6v
```

Note that Charlie is the relayer in the `earth` chain and Damian is the relayer in the `mars` chain. Therefore, the command above is registering Charlie as the counterparty payee on the `earth` chain for Damian in the `mars` chain. We should also do the converse and register Damian as the counterparty payee of Charly.

```bash
hermes fee register-counterparty-payee --chain earth --channel channel-0 --port transfer --counterparty-payee cosmos1uu38gkyed0dte5f9xk20p8wcppulsjt90s7f8h
```

Notice that since both chains are using the same wallet address prefix (i.e. `cosmos`), we could have registered Damian as the counterparty payee of Damian. However, this is not always the case.
