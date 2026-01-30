export interface PracticeProblem {
  id: string
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  status: "solved" | "attempted" | "unattempted"
  description: string
  constraints: string[]
  tags: string[]
  inputFormat: string
  outputFormat: string
  examples: {
    input: string
    output: string
    explanation?: string
  }[]
  starterCode: {
    python: string
    javascript: string
    cpp: string
    java: string
  }
}

export const practiceProblems: PracticeProblem[] = [
  {
    id: "1",
    title: "Two Sum",
    difficulty: "Easy",
    status: "solved",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    constraints: [
      "2 ≤ nums.length ≤ 10^4",
      "-10^9 ≤ nums[i] ≤ 10^9",
      "-10^9 ≤ target ≤ 10^9",
      "Only one valid answer exists.",
    ],
    tags: ["Array", "Hash Table"],
    inputFormat: "First line contains n (size of array) and target. Second line contains n space-separated integers.",
    outputFormat: "Two space-separated indices of the numbers that add up to target.",
    examples: [
      {
        input: "4 9\n2 7 11 15",
        output: "0 1",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "3 6\n3 2 4",
        output: "1 2",
      },
    ],
    starterCode: {
      python: `def two_sum(nums, target):
    # Write your code here
    pass

# Read input
n, target = map(int, input().split())
nums = list(map(int, input().split()))

# Call function and print result
result = two_sum(nums, target)
print(*result)`,
      javascript: `function twoSum(nums, target) {
  // Write your code here
}

// Read input (for competitive programming)
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

let lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  const [n, target] = lines[0].split(' ').map(Number);
  const nums = lines[1].split(' ').map(Number);
  const result = twoSum(nums, target);
  console.log(result.join(' '));
});`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Write your code here
    return {};
}

int main() {
    int n, target;
    cin >> n >> target;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
    }
    vector<int> result = twoSum(nums, target);
    cout << result[0] << " " << result[1] << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static int[] twoSum(int[] nums, int target) {
        // Write your code here
        return new int[]{};
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int target = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        int[] result = twoSum(nums, target);
        System.out.println(result[0] + " " + result[1]);
    }
}`,
    },
  },
  {
    id: "2",
    title: "Valid Parentheses",
    difficulty: "Easy",
    status: "attempted",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order. Every close bracket has a corresponding open bracket of the same type.",
    constraints: ["1 ≤ s.length ≤ 10^4", "s consists of parentheses only '()[]{}'"],
    tags: ["String", "Stack"],
    inputFormat: "A single line containing the string s.",
    outputFormat: "Print 'true' if valid, 'false' otherwise.",
    examples: [
      {
        input: "()",
        output: "true",
      },
      {
        input: "()[]{}",
        output: "true",
      },
      {
        input: "(]",
        output: "false",
      },
    ],
    starterCode: {
      python: `def is_valid(s):
    # Write your code here
    pass

s = input().strip()
print("true" if is_valid(s) else "false")`,
      javascript: `function isValid(s) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
rl.on('line', (s) => {
  console.log(isValid(s) ? 'true' : 'false');
  rl.close();
});`,
      cpp: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isValid(string s) {
    // Write your code here
    return false;
}

int main() {
    string s;
    cin >> s;
    cout << (isValid(s) ? "true" : "false") << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static boolean isValid(String s) {
        // Write your code here
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        System.out.println(isValid(s) ? "true" : "false");
    }
}`,
    },
  },
  {
    id: "3",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    status: "unattempted",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    constraints: ["0 ≤ s.length ≤ 5 * 10^4", "s consists of English letters, digits, symbols and spaces."],
    tags: ["Hash Table", "String", "Sliding Window"],
    inputFormat: "A single line containing the string s.",
    outputFormat: "A single integer representing the length of the longest substring.",
    examples: [
      {
        input: "abcabcbb",
        output: "3",
        explanation: "The answer is 'abc', with the length of 3.",
      },
      {
        input: "bbbbb",
        output: "1",
        explanation: "The answer is 'b', with the length of 1.",
      },
    ],
    starterCode: {
      python: `def length_of_longest_substring(s):
    # Write your code here
    pass

s = input().strip()
print(length_of_longest_substring(s))`,
      javascript: `function lengthOfLongestSubstring(s) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
rl.on('line', (s) => {
  console.log(lengthOfLongestSubstring(s));
  rl.close();
});`,
      cpp: `#include <iostream>
#include <string>
#include <unordered_set>
using namespace std;

int lengthOfLongestSubstring(string s) {
    // Write your code here
    return 0;
}

int main() {
    string s;
    getline(cin, s);
    cout << lengthOfLongestSubstring(s) << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static int lengthOfLongestSubstring(String s) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        System.out.println(lengthOfLongestSubstring(s));
    }
}`,
    },
  },
  {
    id: "4",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    status: "solved",
    description:
      "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
    constraints: [
      "The number of nodes in both lists is in the range [0, 50]",
      "-100 ≤ Node.val ≤ 100",
      "Both list1 and list2 are sorted in non-decreasing order.",
    ],
    tags: ["Linked List", "Recursion"],
    inputFormat:
      "First line contains n (size of list1). Second line contains n integers. Third line contains m (size of list2). Fourth line contains m integers.",
    outputFormat: "Space-separated integers of the merged sorted list.",
    examples: [
      {
        input: "3\n1 2 4\n3\n1 3 4",
        output: "1 1 2 3 4 4",
      },
      {
        input: "0\n\n0\n",
        output: "",
      },
    ],
    starterCode: {
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_two_lists(l1, l2):
    # Write your code here
    pass

# Input handling provided`,
      javascript: `class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeTwoLists(l1, l2) {
  // Write your code here
}`,
      cpp: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    // Write your code here
    return nullptr;
}

int main() {
    // Input handling provided
    return 0;
}`,
      java: `public class Solution {
    public static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }

    public static ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        // Write your code here
        return null;
    }

    public static void main(String[] args) {
        // Input handling provided
    }
}`,
    },
  },
  {
    id: "5",
    title: "Maximum Subarray",
    difficulty: "Medium",
    status: "attempted",
    description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    constraints: ["1 ≤ nums.length ≤ 10^5", "-10^4 ≤ nums[i] ≤ 10^4"],
    tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
    inputFormat: "First line contains n. Second line contains n space-separated integers.",
    outputFormat: "A single integer representing the maximum subarray sum.",
    examples: [
      {
        input: "9\n-2 1 -3 4 -1 2 1 -5 4",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
      },
      {
        input: "1\n1",
        output: "1",
      },
    ],
    starterCode: {
      python: `def max_subarray(nums):
    # Write your code here
    pass

n = int(input())
nums = list(map(int, input().split()))
print(max_subarray(nums))`,
      javascript: `function maxSubArray(nums) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
let lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  const nums = lines[1].split(' ').map(Number);
  console.log(maxSubArray(nums));
});`,
      cpp: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int maxSubArray(vector<int>& nums) {
    // Write your code here
    return 0;
}

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cout << maxSubArray(nums) << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static int maxSubArray(int[] nums) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        System.out.println(maxSubArray(nums));
    }
}`,
    },
  },
  {
    id: "6",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    status: "unattempted",
    description:
      "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
    constraints: ["The number of nodes in the tree is in the range [0, 2000]", "-1000 ≤ Node.val ≤ 1000"],
    tags: ["Tree", "BFS", "Binary Tree"],
    inputFormat: "Nodes given in level order with 'null' for missing nodes.",
    outputFormat: "Each level on a separate line, values space-separated.",
    examples: [
      {
        input: "3 9 20 null null 15 7",
        output: "3\n9 20\n15 7",
      },
      {
        input: "1",
        output: "1",
      },
    ],
    starterCode: {
      python: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def level_order(root):
    # Write your code here
    pass`,
      javascript: `class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function levelOrder(root) {
  // Write your code here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

vector<vector<int>> levelOrder(TreeNode* root) {
    // Write your code here
    return {};
}`,
      java: `import java.util.*;

public class Solution {
    public static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    public static List<List<Integer>> levelOrder(TreeNode root) {
        // Write your code here
        return new ArrayList<>();
    }
}`,
    },
  },
  {
    id: "7",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    status: "unattempted",
    description:
      "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    constraints: ["n == height.length", "1 ≤ n ≤ 2 * 10^4", "0 ≤ height[i] ≤ 10^5"],
    tags: ["Array", "Two Pointers", "Dynamic Programming", "Stack", "Monotonic Stack"],
    inputFormat: "First line contains n. Second line contains n space-separated integers representing heights.",
    outputFormat: "A single integer representing the total trapped water.",
    examples: [
      {
        input: "12\n0 1 0 2 1 0 1 3 2 1 2 1",
        output: "6",
        explanation:
          "The elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped.",
      },
      {
        input: "6\n4 2 0 3 2 5",
        output: "9",
      },
    ],
    starterCode: {
      python: `def trap(height):
    # Write your code here
    pass

n = int(input())
height = list(map(int, input().split()))
print(trap(height))`,
      javascript: `function trap(height) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
let lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  const height = lines[1].split(' ').map(Number);
  console.log(trap(height));
});`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int trap(vector<int>& height) {
    // Write your code here
    return 0;
}

int main() {
    int n;
    cin >> n;
    vector<int> height(n);
    for (int i = 0; i < n; i++) cin >> height[i];
    cout << trap(height) << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static int trap(int[] height) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] height = new int[n];
        for (int i = 0; i < n; i++) height[i] = sc.nextInt();
        System.out.println(trap(height));
    }
}`,
    },
  },
  {
    id: "8",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    status: "unattempted",
    description:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 ≤ m ≤ 1000",
      "0 ≤ n ≤ 1000",
      "1 ≤ m + n ≤ 2000",
      "-10^6 ≤ nums1[i], nums2[i] ≤ 10^6",
    ],
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    inputFormat: "First line contains m and n. Second line contains m integers. Third line contains n integers.",
    outputFormat: "A single floating point number representing the median.",
    examples: [
      {
        input: "2 1\n1 3\n2",
        output: "2.00000",
        explanation: "merged array = [1,2,3] and median is 2.",
      },
      {
        input: "2 2\n1 2\n3 4",
        output: "2.50000",
        explanation: "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.",
      },
    ],
    starterCode: {
      python: `def find_median_sorted_arrays(nums1, nums2):
    # Write your code here
    pass

m, n = map(int, input().split())
nums1 = list(map(int, input().split())) if m > 0 else []
nums2 = list(map(int, input().split())) if n > 0 else []
print(f"{find_median_sorted_arrays(nums1, nums2):.5f}")`,
      javascript: `function findMedianSortedArrays(nums1, nums2) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
let lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  const [m, n] = lines[0].split(' ').map(Number);
  const nums1 = m > 0 ? lines[1].split(' ').map(Number) : [];
  const nums2 = n > 0 ? lines[2].split(' ').map(Number) : [];
  console.log(findMedianSortedArrays(nums1, nums2).toFixed(5));
});`,
      cpp: `#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;

double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    // Write your code here
    return 0.0;
}

int main() {
    int m, n;
    cin >> m >> n;
    vector<int> nums1(m), nums2(n);
    for (int i = 0; i < m; i++) cin >> nums1[i];
    for (int i = 0; i < n; i++) cin >> nums2[i];
    cout << fixed << setprecision(5) << findMedianSortedArrays(nums1, nums2) << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Write your code here
        return 0.0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int m = sc.nextInt(), n = sc.nextInt();
        int[] nums1 = new int[m], nums2 = new int[n];
        for (int i = 0; i < m; i++) nums1[i] = sc.nextInt();
        for (int i = 0; i < n; i++) nums2[i] = sc.nextInt();
        System.out.printf("%.5f%n", findMedianSortedArrays(nums1, nums2));
    }
}`,
    },
  },
]

export function getProblemById(id: string): PracticeProblem | undefined {
  return practiceProblems.find((p) => p.id === id)
}
