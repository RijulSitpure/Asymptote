def sortWordsByWeight(words: list[str], weights: list[int]) -> list[str]:
    def get_weight(w: str) -> int:
        return sum(weights[ord(c) - ord('a')] for c in w)
    return sorted(words, key=lambda w: (get_weight(w), w))