def sortVowelsByFrequency(s: str) -> str:
    vowels_set = set("aeiou")
    vowels = [c for c in s if c in vowels_set]
    freq = {}
    first_seen = {}
    for i, c in enumerate(vowels):
        if c not in freq:
            freq[c] = 0
            first_seen[c] = i
        freq[c] += 1
    unique_vowels = sorted(freq.keys(), key=lambda c: (-freq[c], first_seen[c]))
    sorted_vowels = []
    for c in unique_vowels:
        sorted_vowels.extend([c] * freq[c])
    res = list(s)
    idx = 0
    for i in range(len(res)):
        if res[i] in vowels_set:
            res[i] = sorted_vowels[idx]
            idx += 1
    return "".join(res)