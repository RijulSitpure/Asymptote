#include <cassert>
#include <vector>
#include <string>
#include "solution.cpp"

int main() {
    Solution sol;
    std::vector<std::string> l1 = {"d1/","d2/","../","d21/","./"};
    assert(sol.minOperations(l1) == 2);
    std::vector<std::string> l2 = {"d1/","d2/","./","d3/","../","d31/"};
    assert(sol.minOperations(l2) == 3);
    std::vector<std::string> l3 = {"d1/","../","../","../"};
    assert(sol.minOperations(l3) == 0);
    return 0;
}