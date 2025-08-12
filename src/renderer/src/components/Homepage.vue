<script setup>
import { onMounted } from 'vue'
import { playSound } from '../common/audio'
import { playMovie } from '../common/video'
import sndMenuItemClick from '../assets/snd/ui/menuitem_click.ogg'
import movHomepageBackground from '../assets/mov/homepage_background.webm'

onMounted(() => {
  playMovie(document.getElementById('homepage_background'), movHomepageBackground, true)
})

function tabClick() {
  playSound(sndMenuItemClick)
}
</script>

<template>
  <div id="homepage">
    <video id="homepage_background"></video>
    <div id="homepage_content">
      <div id="homepage_tabs">
        <div
          id="homepage_tab_patchnotes"
          class="homepage_tab homepage_currenttab"
          @click="tabClick"
        >
          NOTES DE PATCH
        </div>
      </div>

      <div id="patchnotes">
        <div id="patchnotes_title">NOTES DE PATCH 3.0.0</div>
        <div id="patchnotes_postdata">INFINITY_54 - <strong>TBA</strong></div>
        <div id="patchnotes_content">
          <p>
            <i class="patchnotes_quotestart"></i> Depuis la sortie de la version 2.5.7, de
            nombreuses failles de sécurité ont été détectés dans l'application. Le problème était
            qu'il n'était pas possible de les réparer, en raison de contraintes techniques. Une
            refonte de l'application a donc eu lieu pour régler ses différentes contraintes, et pour
            donner lui donner un coup de neuf en passant. <i class="patchnotes_quoteend"></i>
          </p>
          <ul>
            <li>
              Refonte de l'application sous Electron-Vite pour faciliter les corrections de
              vulnérabilité
            </li>
            <li>Amélioration des performances globales de l'application</li>
            <li>
              Ajout d'une nouvelle apparence pour les barres de défilement, plus cohérente avec
              celle du client de LoL
            </li>
            <li>
              Amélioration des listes déroulantes, qui sont désormais animées à l'ouverture et à la
              fermeture
            </li>
            <li>
              Suppression de Webpack, ce qui corrige des vulnérabilités de son serveur de
              développement (CVE-2025-30360 & CVE-2025-30359)
            </li>
            <li>Correction d'une vulnérabilité dans le package form-data (CVE-2025-7783)</li>
            <li>Correction d'une vulnérabilité dans le package on-headers (CVE-2025-7339)</li>
            <li>Correction de vulnérabilités d'Electron (CVE-2024-46993)</li>
            <li>Correction d'une vulnérabilité dans le package brace-expansion (CVE-2025-5889)</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#homepage {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100vw - 224px);
  height: 100vh;
  overflow: hidden;

  #homepage_background {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100vw - 224px);
    height: 100vh;
    z-index: 1;
    object-fit: cover;
  }

  #homepage_content {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100vw - 224px);
    height: calc(100vh - 79px);
    margin-top: 79px;
    z-index: 2;

    #homepage_tabs {
      margin-top: 9px;
      margin-left: 50px;
      margin-right: 50px;
      display: flex;

      .homepage_tab {
        width: auto;
        font-family: 'Beaufort for LoL';
        font-weight: 700;
        font-size: 13px;
        color: #c3b58b;
      }

      .homepage_tab:not(:last-child) {
        margin-right: 35px;
      }

      .homepage_tab:hover {
        color: #f0e6d2;
        cursor: pointer;
      }

      .homepage_currenttab {
        font-family: 'Beaufort for LoL';
        font-weight: 700;
        font-size: 13px;
        color: #f0e6d2;
        border-bottom: 1px solid transparent;
        border-image: linear-gradient(
          90deg,
          rgba(198, 183, 141, 0) 0%,
          rgba(198, 183, 141, 1) 50%,
          rgba(195, 181, 139, 0) 100%
        );
        border-image-slice: 1;
      }
    }

    #patchnotes {
      width: 100%;
      margin-top: 24px;
      padding-left: 36px;

      #patchnotes_title {
        margin-right: 36px;
        font-family: 'Beaufort for LoL';
        font-weight: 700;
        font-size: 26px;
        color: #f0e6d2;
      }

      #patchnotes_postdata {
        margin-top: -5px;
        margin-right: 36px;
        font-family: 'Spiegel';
        font-size: 13px;
        color: #a09684;
      }

      #patchnotes_content {
        font-family: 'Spiegel';
        font-size: 13px;
        color: #f0e6d2;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-right: 36px;
        max-height: 533px;
        overflow-x: hidden;
        overflow-y: scroll;

        &::-webkit-scrollbar {
          width: 6px;
        }

        &::-webkit-scrollbar-track {
          background: transparent;
        }

        &::-webkit-scrollbar-thumb {
          background: #785a28;
          border-radius: 20px;
        }

        &::-webkit-scrollbar-thumb:hover {
          background: #c8aa6e;
        }

        &::-webkit-scrollbar-thumb:active {
          background: #463714;
        }

        .patchnotes_quotestart,
        .patchnotes_quoteend {
          display: inline-block;
          width: 18px;
          height: 14px;
          vertical-align: middle;
        }

        .patchnotes_quotestart {
          background-image: url('../assets/img/pages/homepage/patchnotes/patchnotes_quotestart.png');
          background-position: center center;
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }

        .patchnotes_quoteend {
          background-image: url('../assets/img/pages/homepage/patchnotes/patchnotes_quoteend.png');
          background-position: center center;
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }

        .patchnotes_separator {
          width: 100%;
          height: 2px;
          background-color: rgb(36, 44, 54);
          margin-top: 8px;
          margin-bottom: 8px;
        }

        .patchnotes_sectiontitle {
          font-family: 'Beaufort for LoL';
          font-weight: 700;
          font-size: 14px;
          color: rgb(208, 168, 92);
        }
      }
    }
  }
}
</style>
