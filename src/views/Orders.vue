<template>
  <div class="container" style="margin-top: 10em">
    <div class="d-flex justify-content-between align-items-start">
      <h1 class="mb-5">Muhamads Pizzer<br /><small>Bestellungen</small></h1>
      <a class="btn btn-primary btn-sm" role="button" v-on:click="reload"
        >Reload</a
      >
    </div>
    <div v-if="orders.length == 0" class="text-secondary">
      Keine Bestellungen :(
    </div>
    <div class="d-flex flex-wrap">
      <div
        v-for="(order, index) in orders"
        :key="index"
        class="card mr-4 mb-4"
        style="width:190px;"
      >
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <h5 class="card-title">{{ order.name }}</h5>
            <button
              type="button"
              class="close"
              aria-label="Close"
              style="font-size:1em"
              v-on:click="removeOrder(index)"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <p>{{ order.adresse }}</p>
          <div class="d-flex justify-content-between">
            <div style="white-space: pre">
              <div v-for="(item, name) in order.bestellung" :key="name">
                {{ (item[1] + "x").padEnd(5) + item[0].name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
interface Gericht {
  name: string;
  preis: number;
}

interface Bestellung {
  bestellung: { [key: string]: [Gericht, number] };
  name: string;
  adresse: string;
}

async function loadData(vm: any) {
  const response = await fetch("/api/orders");
  const json = await response.json();
  console.log(json);
  vm.orders = json;
}

export default {
  data() {
    return {
      orders: [
        // {
        //   bestellung: {
        //     Döner: [
        //       {
        //         name: "Döner",
        //         preis: 3
        //       },
        //       2
        //     ],
        //     Pizza: [
        //       {
        //         name: "Pizza",
        //         preis: 5
        //       },
        //       1
        //     ]
        //   },
        //   name: "Malte",
        //   adresse: "Bergmannstr. 70\n10961 Berlin"
        // },
        // {
        //   bestellung: {
        //     Döner: [
        //       {
        //         name: "Döner",
        //         preis: 3
        //       },
        //       2
        //     ],
        //     Pizza: [
        //       {
        //         name: "Pizza",
        //         preis: 5
        //       },
        //       1
        //     ]
        //   },
        //   name: "Malte",
        //   adresse: "Bergmannstr. 70\n10961 Berlin"
        // },
        // {
        //   bestellung: {
        //     Döner: [
        //       {
        //         name: "Döner",
        //         preis: 3
        //       },
        //       2
        //     ],
        //     Pizza: [
        //       {
        //         name: "Pizza",
        //         preis: 5
        //       },
        //       1
        //     ]
        //   },
        //   name: "Malte",
        //   adresse: "Bergmannstr. 70\n10961 Berlin"
        // },
        // {
        //   bestellung: {
        //     Döner: [
        //       {
        //         name: "Döner",
        //         preis: 3
        //       },
        //       2
        //     ],
        //     Pizza: [
        //       {
        //         name: "Pizza",
        //         preis: 5
        //       },
        //       1
        //     ]
        //   },
        //   name: "Malte",
        //   adresse: "Bergmannstr. 70\n10961 Berlin"
        // },
        // {
        //   bestellung: {
        //     Döner: [
        //       {
        //         name: "Döner",
        //         preis: 3
        //       },
        //       2
        //     ],
        //     Pizza: [
        //       {
        //         name: "Pizza",
        //         preis: 5
        //       },
        //       1
        //     ]
        //   },
        //   name: "Malte",
        //   adresse: "Bergmannstr. 70\n10961 Berlin"
        // },
        // {
        //   bestellung: {
        //     Döner: [
        //       {
        //         name: "Döner",
        //         preis: 3
        //       },
        //       2
        //     ],
        //     Pizza: [
        //       {
        //         name: "Pizza",
        //         preis: 5
        //       },
        //       1
        //     ]
        //   },
        //   name: "Malte",
        //   adresse: "Bergmannstr. 70\n10961 Berlin"
        // },
        // {
        //   bestellung: {
        //     Döner: [
        //       {
        //         name: "Döner",
        //         preis: 3
        //       },
        //       2
        //     ]
        //   },
        //   name: "Malte",
        //   adresse: "Bergmannstr. 70\n10961 Berlin"
        // }
      ] as Bestellung[]
    };
  },
  methods: {
    reload() {
      loadData(this);
    },
    removeOrder(index: number) {
      fetch("/api/delorder?index=" + index).then(this.reload);
    }
  },
  beforeMount() {
    loadData(this);
    // setInterval(() => {
    //   loadData(this);
    // }, 2000);
  }
};
</script>
