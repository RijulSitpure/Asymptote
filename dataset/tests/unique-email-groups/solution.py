def numUniqueEmails(emails: list[str]) -> int:
    unique = set()
    for e in emails:
        local, domain = e.split('@')
        local = local.split('+')[0].replace('.', '')
        unique.add(f"{local}@{domain}")
    return len(unique)