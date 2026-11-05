from collections import Counter

def countValidWordOccurrences(chunks: list[str], queries: list[str]) -> list[int]:
    s = "".join(chunks)
    n = len(s)
    words = []
    cur = []
    for i, c in enumerate(s):
        if c.islower():
            cur.append(c)
        elif c == '-':
            if i > 0 and i + 1 < n and s[i - 1].islower() and s[i + 1].islower():
                cur.append(c)
            else:
                if cur:
                    words.append("".join(cur))
                    cur = []
        else:
            if cur:
                words.append("".join(cur))
                cur = []
    if cur:
        words.append("".join(cur))
    counts = Counter(words)
    return [counts[q] for q in queries]