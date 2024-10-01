const express = require('express');
const vaultService = require('../service/vault');
const router = express.Router();

// Get all vault entries
router.get('/', vaultService.getAllVaultEntries);

// Add a new chip/cash denomination to the vault
router.post('/add', vaultService.addVaultEntry);

// Update a vault entry
router.put('/:vault_id', vaultService.updateVaultEntry);

module.exports = router;
