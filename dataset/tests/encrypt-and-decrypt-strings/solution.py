from typing import List, Optional, Tuple, Dict, Set

class Encrypter:
    def __init__(self, keys: list[str], values: list[str], dictionary: list[str]):
        self.enc = {k: v for k, v in zip(keys, values)}
        self.counts = {}
        for word in dictionary:
            encrypted = self.encrypt(word)
            if encrypted:
                self.counts[encrypted] = self.counts.get(encrypted, 0) + 1

    def encrypt(self, word1: str) -> str:
        res = []
        for c in word1:
            if c not in self.enc:
                return ""
            res.append(self.enc[c])
        return "".join(res)

    def decrypt(self, word2: str) -> int:
        return self.counts.get(word2, 0)
