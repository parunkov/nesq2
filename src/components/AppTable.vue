<script setup lang="ts"></script>

<template>
  <main class="table-container">
    <table>
      <thead>
        <slot name="thead" />
      </thead>
      <tbody>
        <slot name="tbody" />
      </tbody>
    </table>
  </main>
</template>

<style lang="scss">
.table-container {
  display: flex;
  width: 100%;
  padding: vw(20);
  padding-top: vw(10);
  align-items: flex-start;
  gap: vw(20);
  justify-content: flex-start;
  flex: 1;

  @media (max-width: 991px) {
    padding: 0;
    background-color: var(--color-gray-100);
  }
}

table {
  border-collapse: separate;
  border-radius: vw(10);
  min-width: vw(240);
  border-spacing: 0 vw(10);
  table-layout: auto; // или fixed, если хочешь равномерность

  font-size: vw(15);
  color: var(--color-black);
  font-weight: 500;

  @media (max-width: 991px) {
    border-spacing: 0 vw(10, $mobile);
  }
}

thead {
  width: 100%;
  font-size: vw(15);
  color: var(--color-black);
  font-weight: 500;
  white-space: nowrap;
  line-height: 1;
  height: vw(38);
  background-color: var(--color-gray-2);

  tr {
    background-color: var(--color-gray-2);
    text-align: start;
    border: vw(1) solid var(--color-gray-3);
    height: vw(38);

    th {
      border: vw(1) solid var(--color-gray-3);
      border-bottom-color: var(--color-gray-3);
      padding: vw(9) vw(10);

      &:first-child {
        border-left-color: var(--color-gray-3);
      }

      &:last-child {
        border-right-color: var(--color-gray-3);
      }


      div {
        font-weight: 600;
      }
    }

    /* Скругляем углы: первая и последняя ячейка */
    th:first-child {
      border-top-left-radius: vw(10);
      border-bottom-left-radius: vw(10);
    }

    th:last-child {
      border-top-right-radius: vw(10);
      border-bottom-right-radius: vw(10);
    }
  }

  th:not(:first-child) {
    border-left: vw(1) solid var(--color-gray-400);
  }

  th>* {
    align-self: stretch;
    width: 100%;
    gap: vw(10);
  }
}

tbody {
  margin-top: 0;
  width: 100%;

  tr {
    border-radius: vw(20);
    background-color: var(--color-white);
    padding: vw(10);
    align-items: stretch;
    margin-top: vw(10);

    @media (max-width: 991px) {
      margin-top: vw(10, $mobile);
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    td {
      border: vw(1) solid transparent;
      box-sizing: border-box;

      * {
        margin: vw(10);
        gap: vw(10);
      }
    }

    td:first-child {
      border-top-left-radius: vw(20);
      border-bottom-left-radius: vw(20);
    }

    td:last-child {
      border-top-right-radius: vw(20);
      border-bottom-right-radius: vw(20);
    }
  }

  .sub-header {
    all: unset;
    color: var(--color-sub-header);
    background-color: transparent;
    font-weight: 500;
    font-size: vw(18);
    line-height: vw(20);
    vertical-align: bottom;
  }
}

tr {
  box-shadow: 0 vw(5) vw(15) 0 rgba(0, 0, 0, 0.05);
  border-radius: vw(10);
  width: 100%;
  min-height: vw(60);
  height: vw(60);
  align-items: flex-start;
  justify-content: flex-start;
}

td {
  border-left: vw(1) solid var(--color-gray-100);
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
}

@media (max-width: 991px) {
  thead {
    display: none;
  }
}

tr.is-warning {
  background-color: var(--color-warning);
  border: vw(1) solid var(--color-warning-border);

  td {
    border-top-color: var(--color-warning-border);
    border-bottom-color: var(--color-warning-border);

    @media (max-width: 991px) {
      border-top-color: transparent;
      border-bottom-color: transparent;
    }

    &:first-child {
      border-left-color: var(--color-warning-border);

      @media (max-width: 991px) {
        border-left-color: transparent;
      }
    }

    &:last-child {
      border-right-color: var(--color-warning-border);

      @media (max-width: 991px) {
        border-right-color: transparent;
      }
    }
  }
}

tr.is-error {
  background-color: var(--color-error);
  border: vw(1) solid var(--color-error-border);

  td {
    border-top-color: var(--color-error-border);
    border-bottom-color: var(--color-error-border);

    @media (max-width: 991px) {
      border-top-color: transparent;
      border-bottom-color: transparent;
    }

    &:first-child {
      border-left-color: var(--color-error-border);

      @media (max-width: 991px) {
        border-left-color: transparent;
      }
    }

    &:last-child {
      border-right-color: var(--color-error-border);

      @media (max-width: 991px) {
        border-right-color: transparent;
      }
    }
  }
}
</style>
