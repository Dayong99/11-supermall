<template>
  <div class="wrapper" ref="aaaa">
    <div>
      <div @click="divClick">rrrrrrrr</div>
      <ul class="content">
        <button @click="btnClick">wwwww</button>
        <li>GG1</li>
        <li>GG2</li>
        <li>GG3</li>
        <li>GG4</li>
        <li>GG5</li>
        <li>GG6</li>
        <li>GG7</li>
        <li>GG8</li>
        <li>GG9</li>
        <li>GG10</li>
        <li>GG11</li>
        <li>GG12</li>
        <li>GG13</li>
        <li>GG14</li>
        <li>GG15</li>
        <li>GG16</li>
        <li>GG17</li>
        <li>GG18</li>
        <li>GG19</li>
        <li>GG20</li>
        <li>GG21</li>
        <li>GG22</li>
        <li>GG23</li>
        <li>GG24</li>
        <li>GG25</li>
        <li>GG26</li>
        <li>GG27</li>
        <li>GG28</li>
        <li>GG29</li>
        <li>GG30</li>
        <li>GG31</li>
        <li>GG32</li>
        <li>GG33</li>
        <li>GG34</li>
        <li>GG35</li>
        <li>GG36</li>
        <li>GG37</li>
        <li>GG38</li>
        <li>GG39</li>
        <li>GG40</li>
        <li>GG41</li>
        <li>GG42</li>
        <li>GG43</li>
        <li>GG44</li>
        <li>GG45</li>
        <li>GG46</li>
        <li>GG47</li>
        <li>GG48</li>
        <li>GG49</li>
        <li>GG50</li>
        <li>GG51</li>
        <li>GG52</li>
        <li>GG53</li>
        <li>GG54</li>
        <li>GG55</li>
        <li>GG56</li>
        <li>GG57</li>
        <li>GG58</li>
        <li>GG59</li>
        <li>GG60</li>
        <li>GG61</li>
        <li>GG62</li>
        <li>GG63</li>
        <li>GG64</li>
        <li>GG65</li>
        <li>GG66</li>
        <li>GG67</li>
        <li>GG68</li>
        <li>GG69</li>
        <li>GG70</li>
        <li>GG71</li>
        <li>GG72</li>
        <li>GG73</li>
        <li>GG74</li>
        <li>GG75</li>
        <li>GG76</li>
        <li>GG77</li>
        <li>GG78</li>
        <li>GG79</li>
        <li>GG80</li>
        <li>GG81</li>
        <li>GG82</li>
        <li>GG83</li>
        <li>GG84</li>
        <li>GG85</li>
        <li>GG86</li>
        <li>GG87</li>
        <li>GG88</li>
        <li>GG89</li>
        <li>GG90</li>
        <li>GG91</li>
        <li>GG92</li>
        <li>GG93</li>
        <li>GG94</li>
        <li>GG95</li>
        <li>GG96</li>
        <li>GG97</li>
        <li>GG98</li>
        <li>GG99</li>
        <li>GG100</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Category",
    data() {
      return {
        scroll: null
      }
    },
    mounted () {
      this.scroll = new BScroll(document.querySelector('.wrapper'),{
        click: true,
        probeType:3,
        pullUpLoad:true
      })

      this.scroll.on('scroll', (position) => {
        console.log(position);
        })

      this.scroll.on('pullingUp', () => {
        console.log('hhhhhhhh');
      })
    },
    methods: {
      btnClick() {
        console.log('btnClick');
      },
      divClick() {
        console.log('divclick');
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 150px;
    background-color: red;

    overflow: hidden;
  }
</style>
