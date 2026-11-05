class Solution:
    def countOfSubstrings(self, word: str, k: int) -> int:
        vowels = set("aeiou")
        
        def at_least(target_k: int) -> int:
            cnt_v = {c: 0 for c in "aeiou"}
            vowel_kinds = 0
            consonants = 0
            left = 0
            res = 0
            n = len(word)
            
            for right in range(n):
                ch = word[right]
                if ch in vowels:
                    if cnt_v[ch] == 0:
                        vowel_kinds += 1
                    cnt_v[ch] += 1
                else:
                    consonants += 1
                    
                while vowel_kinds == 5 and consonants >= target_k:
                    res += n - right
                    l_ch = word[left]
                    if l_ch in vowels:
                        cnt_v[l_ch] -= 1
                        if cnt_v[l_ch] == 0:
                            vowel_kinds -= 1
                    else:
                        consonants -= 1
                    left += 1
            return res
            
        return at_least(k) - at_least(k + 1)
