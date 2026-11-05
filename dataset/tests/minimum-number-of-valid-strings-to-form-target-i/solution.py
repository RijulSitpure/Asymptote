class Solution:
    def minValidStrings(self, words: list[str], target: str) -> int:
        n = len(target)
        
        # Build Trie of all word prefixes
        trie = {}
        for w in words:
            curr = trie
            for ch in w:
                if ch not in curr:
                    curr[ch] = {}
                curr = curr[ch]
                
        # For each index i, find max match length
        max_jump = [0] * n
        for i in range(n):
            curr = trie
            length = 0
            for j in range(i, n):
                ch = target[j]
                if ch not in curr:
                    break
                curr = curr[ch]
                length += 1
            max_jump[i] = length
            
        # Jump Game BFS to find min jumps to reach n
        jumps = 0
        curr_end = 0
        farthest = 0
        
        for i in range(n):
            if i + max_jump[i] > farthest:
                farthest = i + max_jump[i]
            if i == curr_end:
                if farthest == curr_end:
                    return -1
                jumps += 1
                curr_end = farthest
                if curr_end >= n:
                    return jumps
                    
        return jumps if curr_end >= n else -1
