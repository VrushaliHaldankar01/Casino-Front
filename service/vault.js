const Vault = require('../models/vault');

// Get all vault entries
const getAllVaultEntries = async (req, res) => {
    try {
        const vaultEntries = await Vault.findAll();
        res.json(vaultEntries);
    } catch (error) {
        console.error('Error fetching vault entries:', error);
        res.status(500).send('Server Error');
    }
};

// Add a new chip/cash denomination
const addVaultEntry = async (req, res) => {
    const { chip_denomination, chip_value, chip_qty, cash_value } = req.body;

    try {
        const newEntry = await Vault.create({ chip_denomination, chip_value, chip_qty, cash_value });
        res.status(201).json(newEntry);
    } catch (error) {
        console.error('Error adding vault entry:', error);
        res.status(500).send('Server Error');
    }
};

// Update a vault entry
const updateVaultEntry = async (req, res) => {
    const { vault_id } = req.params;
    const { chip_qty, cash_value } = req.body;

    try {
        const vaultEntry = await Vault.findByPk(vault_id);
        if (!vaultEntry) {
            return res.status(404).json({ error: 'Vault entry not found' });
        }

        if (chip_qty !== undefined) vaultEntry.chip_qty = chip_qty;
        if (cash_value !== undefined) vaultEntry.cash_value = cash_value;

        await vaultEntry.save();
        res.json(vaultEntry);
    } catch (error) {
        console.error('Error updating vault entry:', error);
        res.status(500).send('Server Error');
    }
};

module.exports = { getAllVaultEntries, addVaultEntry, updateVaultEntry };
