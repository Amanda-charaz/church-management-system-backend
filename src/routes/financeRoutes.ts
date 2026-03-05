router.get("/", authenticate, authorize("ADMIN", "FINANCE"), getFinances)
router.post("/", authenticate, authorize("ADMIN", "FINANCE"), createFinance)