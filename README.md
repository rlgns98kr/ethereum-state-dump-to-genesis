# Ethereum State Dump To Genesis
A tool to create ethereum genesis file from state dump.

# Prerequisite
You need 2 files. One is a genesis file to use your chain's genesis configs. The other is a state dump files to use your chain's state.

# Run
```
yarn install
yarn start -g ./input_genesis_example.json -s ./input_state_dump_example.json -o ./output_genesis_example.json
```