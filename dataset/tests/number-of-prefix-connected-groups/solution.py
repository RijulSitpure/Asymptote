def prefixConnectedGroups(words: list[str], k: int) -> int:
    groups = set()
    for w in words:
        groups.add(w[:k])
    return len(groups)