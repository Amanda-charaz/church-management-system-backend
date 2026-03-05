router.get("/", authenticate, authorize("ADMIN", "PASTOR"), getMembers)
router.post("/", authenticate, authorize("ADMIN"), createMember)