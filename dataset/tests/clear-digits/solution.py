class Solution:
    def clearDigits(self, s: str) -> str:
        st = []
        for ch in s:
            if ch.isdigit():
                if st:
                    st.pop()
            else:
                st.append(ch)
        return "".join(st)