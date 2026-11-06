def rearrangeToAvoidPair(s: str, forbidden: str) -> str:
    # Sort descending so characters like 'a' followed by 'b' are reversed to 'b' then 'a'
    chars = sorted(s, reverse=True)
    res = "".join(chars)
    if forbidden in res:
        # Sort ascending as fallback
        res = "".join(sorted(s))
    return res if forbidden not in res else "" 